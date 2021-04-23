import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

import { SharedModule } from 'primeng/api';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [DashboardComponent, CardComponent],
  imports: [
    CommonModule,
    SharedModule,
    PrimeNgModule
  ],
  exports: [
    DashboardComponent,
    CardComponent
  ]
})
export class DashboardModule { }
