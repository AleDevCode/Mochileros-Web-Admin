import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinosComponent } from './pages/destinos/destinos.component';
import {DestinosRoutingModule} from './destinos-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [DestinosComponent],
  imports: [
    CommonModule, 
    DestinosRoutingModule, 
    PrimeNgModule, 
    FormsModule
  ],
  exports: [
    DestinosComponent
  ]
})
export class DestinosModule { }
