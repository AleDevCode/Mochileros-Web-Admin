import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import {AuthService} from '../../auth/services/auth.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  private _usuario: User;



  constructor(private router: Router,
    private authService: AuthService
  ) {


  }

  ngOnInit() {



    this.items = [{
      label: 'Menu',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/' },
        { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/users' },
        { label: 'Categorias', icon: 'pi pi-tag', routerLink: '/categorias' },
        { label: 'Destinos', icon: 'pi pi-map-marker', routerLink: '/destinos' },
        { label: 'Empresas', icon: 'pi pi-briefcase', routerLink: '/empresas' },
        { label: 'Servicios ', icon: 'pi pi-ticket', routerLink: '/servicios' },
        { label: 'Log Out ', icon: 'pi pi-ticket', command: () => this.logout() }
      ]
    },
    ];

  }


  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
   

    }

    get usuario() {
      return this._usuario;
    }

    get auth() {
      return this.authService;
    }
  
  
  

}
