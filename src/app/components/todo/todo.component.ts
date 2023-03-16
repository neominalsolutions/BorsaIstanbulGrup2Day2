import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, skip, Subscription, take, tap } from 'rxjs';
import { ITodo, TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  todos!: ITodo[]; // sync veri
  todos$!: Observable<ITodo[]>; // async veri, observable tipler için sonuna değişkenin $ ifadesi koyma alışkanlığımız var.
  todoSub!: Subscription;

  // DI
  constructor(private tS: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
    this.loadDataAsync();
  }

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
    // this.todos$.subscribe(); // componentdeki | async pipe subscription yönetimi yapıyor.
  }

  loadData() {
    // promise chain deki gibi iç içe sıralı veri çekme durumları oludğunda subscribe olup diğer service bağlanmamız gerekebilir.
    this.todoSub = this.tS.getTodos('todos').subscribe({
      next: (data) => {
        console.log('data', data);

        this.todos = [...data];

        // this.router.events.subscribe((e) => {

        // })
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  loadDataAsync() {
    this.todos$ = this.tS.getTodos('todos').pipe(
      tap((data) => {
        console.log('tap', data);
      }),
      map((data) => {
        console.log('map', data.slice(1, 10));
        return data.slice(1, 10);
      })
    );
  }
}
