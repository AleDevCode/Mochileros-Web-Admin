import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CategoriasComponent },
      //   { path: 'create', component: CreateServicioComponent },
      //   { path: ':id', component: DetailsServicioComponent }
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
export class CategoriasRoutingModule { }
