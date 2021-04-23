import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {EmpresasComponent} from '../empresas/pages/empresas/empresas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: EmpresasComponent },
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
export class EmpresasRoutingModule { }
