import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAuthComponent } from './authentification/pages/user-auth/user-auth.component';
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule,HttpClient } from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "./app-routing.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MatIconModule,
    AppRoutingModule,
    MatGridListModule,
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
