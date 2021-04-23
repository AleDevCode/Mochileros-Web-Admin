import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { CreateServicioComponent } from './pages/create-servicio/create-servicio.component';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import {ServiciosService} from '../servicios/services/servicios.service';
import { DetailsServicioComponent } from './pages/details-servicio/details-servicio.component';
import { EditServicioComponent } from './pages/edit-servicio/edit-servicio.component';




@NgModule({
  declarations: [ServiciosComponent, CreateServicioComponent, DetailsServicioComponent, EditServicioComponent],
  imports: [
    CommonModule, 
    PrimeNgModule,
    ServiciosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports :[
    ServiciosComponent,
    CreateServicioComponent,

  ]
})
export class ServiciosModule { }
