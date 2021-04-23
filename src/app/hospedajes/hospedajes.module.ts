import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HospedajesComponent } from './pages/hospedajes/hospedajes.component';
import { CreateHospedajeComponent } from './pages/create-hospedaje/create-hospedaje.component';
import { HospedajesRoutingModule } from '../hospedajes/hospedajes-routing.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HospedajesComponent, CreateHospedajeComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    HospedajesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HospedajesComponent,
  ]
})
export class HospedajesModule { }
