import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import {CategoriasRoutingModule} from './categorias-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CategoriasComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    CategoriasRoutingModule,
    FormsModule
  ], 
  exports: [
    CategoriasComponent
  ]
})
export class CategoriasModule { }
