import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { CreateServicioComponent } from './pages/create-servicio/create-servicio.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailsServicioComponent } from './pages/details-servicio/details-servicio.component';
import { EditServicioComponent } from './pages/edit-servicio/edit-servicio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ServiciosComponent },
      { path: 'create', component: CreateServicioComponent },
      { path: ':id', component: DetailsServicioComponent },
      { path: 'edit/:id', component: EditServicioComponent }
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
export class ServiciosRoutingModule { }
