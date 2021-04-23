import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports : [
    LoginComponent,


  ],
})
export class AuthModule { }
