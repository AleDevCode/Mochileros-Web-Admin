import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { HospedajesComponent } from './hospedajes/pages/hospedajes/hospedajes.component';
import { UsersComponent } from './users/pages/users/users.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'servicios', loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule) },
  { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule) },
  { path: 'destinos', loadChildren: () => import('./destinos/destinos.module').then(m => m.DestinosModule) },
  { path: 'empresas', loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
