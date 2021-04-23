import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { EmpresasRoutingModule } from '../empresas/empresas-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [EmpresasComponent],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class EmpresasModule { }
