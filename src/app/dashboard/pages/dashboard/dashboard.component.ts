import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private _usuario: User;

  public cards = [

    { titulo: 'Usuarios', img: '/assets/images/users.png', width: '100', height: '100', class: "small-card", routerLink: '/users' },
    { titulo: 'Destinos', img: '/assets/images/destinos.png', width: '160', height: '90', class: "small-card", routerLink: '/destinos' },
    { titulo: 'Empresas', img: '/assets/images/empresas.png', width: '160', height: '90', class: "small-card", routerLink: '/empresas' },
    { titulo: 'Categorías', img: '/assets/images/categorias.png', width: '160', height: '90', class: "large-card", routerLink: '/categorias' },
    { titulo: 'Servicios', img: '/assets/images/entretenimiento.png', width: '450', height: '90', class: "large-card", routerLink: '/servicios' }];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.getUser().subscribe(res => {
      this._usuario = {
        nombre: res.nombre!,
        uid: res.uid!,
        email: res.email!
      }
    });



  }


  get usuario() {
    return this._usuario;
  }





}
