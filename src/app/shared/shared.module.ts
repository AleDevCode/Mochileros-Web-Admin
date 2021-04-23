import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';



import { MenuComponent } from './menu/menu.component';
import { AuthModule } from '../auth/auth.module';
//import { CreateServicioComponent } from './pages/create-servicio/create-servicio.component';






@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    AuthModule
  ],
  exports: [
    MenuComponent,

  ]
})
export class SharedModule { }
