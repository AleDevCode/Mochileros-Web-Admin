import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    PrimeNgModule
  ], 
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
