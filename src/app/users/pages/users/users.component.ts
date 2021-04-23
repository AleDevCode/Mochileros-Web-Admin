import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usuarios: User[]
  selectedId = '';



  constructor(
    private usuariosService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService

  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsers(100).subscribe(res => {
      console.log(res);
      this.usuarios = res.users;
    });
  }

  showConfirm(id) {
    console.log('Showconfirm');
    this.selectedId = id;
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas borrar este usuario?',
      accept: () => {
        console.log('Confirmado');
        this.deleteServicio();
      }
    });
  }

  onConfirm() {
    this.deleteServicio();
    this.messageService.clear();
  }

  onReject() {
    this.messageService.clear();
  }

  deleteServicio() {

    console.log(this.selectedId);
    this.usuariosService.deleteUser(this.selectedId).subscribe(res => {
      if (res.success) {
        this.getUsuarios();

        this.messageService.add({ severity: 'success', summary: '¡Resgistro Eliminado!', detail: res.message });
      } else {
        console.log(res.err);
      }
    });

  }



}
