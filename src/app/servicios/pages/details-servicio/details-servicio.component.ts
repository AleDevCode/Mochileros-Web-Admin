import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Servicio } from 'src/app/models/servicio.model';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-details-servicio',
  templateUrl: './details-servicio.component.html',
  styleUrls: ['./details-servicio.component.scss'], 
  encapsulation: ViewEncapsulation.None
})
export class DetailsServicioComponent implements OnInit {

  public id: String = "";
  public servicio: Servicio;
  public items: MenuItem[];

  
  constructor(
    private serviciosService: ServiciosService,
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
  ) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.serviciosService.getServicioById(this.id).subscribe(res => {
      console.log(res);
      this.servicio = res.servicio;
      console.log(this.servicio);
    });

    this.items = [
      {label:'Dashboard', url : '../'},
      {label:'Servicios', url : '/servicios'},
      {label:'Detalles Servicio', url : `/servicios/${this.id}`},
  ];
   
  }

}
