import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

// Client side uygulamadaki DTO
export interface ITodo {
  id: number;
  completed: boolean;
  userId?: number; // optional
  title: string;
}

// @Injectable() // her çağrıda instance alıyor
@Injectable({
  providedIn: 'root', // Root uygulama seviyesinde tanımlanmıştır. singleton instance sahip.
})
export class TodoService {
  // bir service başka bir service bağımlı ise angular service bağımlılıkları constructor vasıtası ile aktarılır
  // DI Dependency Injection (Contructor DI) kullanıyor.
  constructor(private httpService: HttpClient) {}

  // Observable bir durumu tetiklemek için subscribe oluruz.

  getTodos(endpoint: string): Observable<ITodo[]> {
    return this.httpService.get<ITodo[]>(
      `${environment.jsonPlaceHolderBaseApiUrl}/${endpoint}`
    );
  }

  addTodo(endpoint: string, todo: ITodo) {
    return this.httpService.post<ITodo>(
      `${environment.jsonPlaceHolderBaseApiUrl}/${endpoint}`,
      todo
    );
  }
}
