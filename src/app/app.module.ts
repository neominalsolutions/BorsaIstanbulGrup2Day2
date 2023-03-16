import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PromisesComponent } from './promises/promises.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './components/todo/todo.component';
@NgModule({
  declarations: [AppComponent, PromisesComponent, TodoComponent],
  imports: [BrowserModule, HttpClientModule], // http işlemlerini yöneten module
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
