import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-rxjs-subjects',
  templateUrl: './rxjs-subjects.component.html',
  styleUrls: ['./rxjs-subjects.component.css'],
})
export class RxjsSubjectsComponent implements OnInit {
  // Subject : başlangıç değeri almıyor ve tekrarlama davranışı göstermiyor.
  // AsyncSubject
  // BehaviourSubject
  // ReplaySubject

  ngOnInit(): void {}

  sub = new Subject<string>(); // mesaj gönderici bir service yaptık
  onSubject() {
    // participant
    this.sub.subscribe({
      next: (data) => {
        console.log('1. dinleyici', data);
      },
    });

    // participant
    this.sub.subscribe({
      next: (data) => {
        console.log('2. dinleyici', data);
      },
    });

    // multicasting işlemi yaptık
    // data transfer işlemi için next methodunu kullanırız
    // konuşmacı
    this.sub.next('merhaba');
    this.sub.next('merhaba3');

    // toplantıya başkası katıldı.
    // yukarıdaki konuşmaları kaçırdı.
    this.sub.subscribe({
      next: (data) => {
        console.log('3. dinleyici', data);
      },
    });
  }

  // bir başlangıç değeri var.
  // mesaj gönderimi ile sürece başlıyor
  // asyncsubject ve subject de bir başlangıç değeri yok
  // güncel veri ile ilgileniyorsak kullanırız.
  behaviorSubs = new BehaviorSubject<string>('');
  onBehaviorSubject() {
    this.behaviorSubs.subscribe({
      next: (msg: string) => {
        console.log('1. dinleyici', msg);
      },
    });

    this.behaviorSubs.subscribe({
      next: (msg: string) => {
        console.log('2. dinleyici', msg);
      },
    });

    this.behaviorSubs.next('ikinci mesaj');
    this.behaviorSubs.next('üçüncü mesaj');

    // behavior subject de complete methoduna gerek yok.
    // abonelikler mesaj gönderilmeden önce tanımlandıysa tüm mesajları hafızada tutarak dağıtımını sağlar.

    // mesaj dağıtımından sonra meydana gelen bir abonelik söz konusu ise son mesajı memory de tutar ve dağıtır.
    // 3. dinleyici sadece son yayınlanan mesaj hakkında bilgilendirilecektir.
    // subject de zaten dinleyici mesaj yayınlanması sonrasında abone oluyorsa hiç bir mesajı dinliyemiyordu.

    this.behaviorSubs.subscribe({
      next: (msg: string) => {
        console.log('3. dinleyici', msg);
      },
    });
  }

  // asyncsubject kanaldaki son mesajı dinlememizi sağlar. next ile ne kadar mesaj gönderirsek gönderelim son mesaj geçerli olacaktır.
  asyncSub = new AsyncSubject<string>();
  onAsyncSubject() {
    this.asyncSub.subscribe({
      next: (msg) => {
        console.log('1. async msg', msg);
      },
    });

    this.asyncSub.subscribe({
      next: (msg) => {
        console.log('2. async msg', msg);
      },
    });

    this.asyncSub.next('mesaj-1');
    // en son konuşulan şey akılda tutuluyor.
    // güncel veri döndürmek istediğimiz durumlarda kullanabiliriz.
    this.asyncSub.next('mesaj-2');

    // complete methodu asyncSubject kullanırken işi sonlandırırız.
    this.asyncSub.complete();

    // subject ile asyncsubject arasındaki farklardan biri subject ile tüm mesajlar dağıtılır.
    // async subject sadece son mesajı multicast eder.
    // async subject ile yeni bir abone sürece dahil olduğunda son mesajı dinler

    // subject de yeni bir abone sisteme eklendiğinde mesajlar son abone iletilmez.

    this.asyncSub.subscribe({
      next: (msg) => {
        console.log('3. async msg', msg);
      },
    });
  }

  // behavior subject çok benzer yanlız toplantıya sonradan katılacak olan abonelerin ne kadar mesajı hafıza tutacağı ile de ilgilenir.
  // behivour subject sonradan abone olan durumlarda son mesajı hafıza saklardı.
  // bir başlangıç değeri yok
  replaySub = new ReplaySubject(3); // kanaldaki kaç adet mesaj hafızaya atılcaktır.
  onReplaySubject() {
    this.replaySub.subscribe({
      next: (msg) => {
        console.log('replay-listener-1', msg);
      },
    });

    this.replaySub.next('1.replay-msg');
    this.replaySub.next('2.replay-msg');
    this.replaySub.next('3.replay-msg');

    this.replaySub.subscribe({
      next: (msg) => {
        console.log('replay-listener-2', msg);
      },
    });

    this.replaySub.next('4.replay-msg');

    this.replaySub.subscribe({
      next: (msg) => {
        console.log('replay-listener-3', msg);
      },
    });

    // subscription açtık bunları nasıl kapatacağız.
    // unsubscribe işlemlerini component destroy veya işlem bittikten sonrada method içerisinde manuel olarak tetikleyebiliriz.
  }
}
