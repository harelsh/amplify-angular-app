import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { Lex2ServiceService } from './services/lex2-service.service';
import { TodosComponent } from './todos/todos.component';
import { InteractComponent } from './interact/interact.component';



@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    InteractComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    Lex2ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
