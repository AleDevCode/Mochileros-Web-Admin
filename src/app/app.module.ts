import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';

//ClientModule
import { HttpClientModule } from '@angular/common/http';
//Modulos de la App
import { PrimeNgModule } from './prime-ng/prime-ng.module'
import {SharedModule} from './shared/shared.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {HospedajesModule} from './hospedajes/hospedajes.module';
import { ServiciosModule } from './servicios/servicios.module';
import { DestinosModule } from './destinos/destinos.module';
import { CategoriasModule } from './categorias/categorias.module';
import {EmpresasModule} from './empresas/empresas.module';
import {UserService} from './users/services/user.service';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    SharedModule,
    DashboardModule,
    UsersModule,
    AuthModule,
    HospedajesModule,
    ServiciosModule,
    DestinosModule,
    EmpresasModule,
    CategoriasModule,
    ToastModule,
    

    



  ],
  providers: [ UserService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
