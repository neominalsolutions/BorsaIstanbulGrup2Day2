import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PromisesComponent } from './promises/promises.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './components/todo/todo.component';
import { ApiLogger, ConsoleLogger, loggerType } from './providers/ILogger';
import { HomeComponent } from './providers/home/home.component';
import { AboutComponent } from './providers/about/about.component';
import localeTr from '@angular/common/locales/tr';
import localeDeu from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeTr);
registerLocaleData(localeDeu);

@NgModule({
  declarations: [
    AppComponent,
    PromisesComponent,
    TodoComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [BrowserModule, HttpClientModule], // http işlemlerini yöneten module
  providers: [
    {
      provide: loggerType, // uygulama genelinde logger isminde bir servis kullanacağım
      useClass: ApiLogger,
    },
    { provide: LOCALE_ID, useValue: 'tr' }, // para birimi, tarih saat türkçe diline göre ayarlansın, verilen değere göre bir service çalıştır. (useExisting,useFactory,useValue,useClass)
    // service sağlayıcılara ait durumları burada işleyeceğiz.
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
