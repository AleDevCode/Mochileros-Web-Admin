import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateHospedajeComponent } from './pages/create-hospedaje/create-hospedaje.component';
import { HospedajesComponent } from './pages/hospedajes/hospedajes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HospedajesComponent },
      { path: 'create', component: CreateHospedajeComponent }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HospedajesRoutingModule { }
