import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { DestinosComponent } from './pages/destinos/destinos.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DestinosComponent },
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ], 
  exports : [
    RouterModule
  ]
})
export class DestinosRoutingModule { }
