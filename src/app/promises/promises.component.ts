import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css'],
})
export class PromisesComponent implements OnInit {
  ngOnInit(): void {
    // tanımladığımız anda bir kaynak tüketimi olur.
    const promise1 = new Promise((resolve, reject) => {
      // resolve('ali');
      // reject('hata');

      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });

    promise1
      .then((data) => {
        // söz tutuldu
        console.log('p1-data', data);
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        console.log('iş bitti'); // hata olsun olmasın girilen kısımı function complete yaparal yöntettik.
      }); // pending, fullfilled (resolve, reject),

    const promise2 = new Promise((resolve, reject) => {
      // 1sn beklet işlem yap
      return setTimeout(() => {
        resolve('promise2');
        //reject('p2 error');
      }, 10);
    });

    // senkton kod
    const value = 'ali';
    console.log('value', value);

    // asenkron olan bir kodu sıralı çalıştırmak için
    // kodlar asenkron çalıştığından dolayı bir kodun diğerini beklemesi gereken durumlarda tercih edilir. iç içe yazım.
    promise2.then((data) => {
      console.log('ilk-data', data);
      // promise1 promise2 nin çözülmesini bekliyorsa iç içe yazılmalıdır.
      promise1.then((data) => {
        console.log('ikinci-data', data);
      });
    });

    // bütün promiseleri aynı anda çözer. dizi olarak çözülmüş olan promise sonucu döndürür.
    const promise3 = Promise.all([promise1, promise2]); // senkronlaştırmış olduk

    promise3
      .then((data) => {
        console.log('promise-all-result', data); // aynı anda response döner
      })
      .catch((err) => {
        console.log('promise-all-err');
      });

    // ES7 async await eğer birbirini bekleyen bir iş durumu varsa mantıklı promise ile çalışır

    (async () => {
      try {
        let r1 = await promise1; // async1
        console.log('async-await-1', r1);
        let c = 'can'; // senkton operasyon
        console.log('async-await-2', c);
        let r2 = await promise2; // bunlardan bir reject olursa catch //async hatayı yakalasın
        console.log('async-await-3', r2);
      } catch (error) {
        console.log('async-err', error);
      } finally {
        console.log('async-bitti');
      }
    })();
  }
}
