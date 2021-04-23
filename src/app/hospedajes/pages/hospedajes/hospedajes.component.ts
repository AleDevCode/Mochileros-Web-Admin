import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HospedajesService } from '../../services/hospedajes.service';

@Component({
  selector: 'app-hospedajes',
  templateUrl: './hospedajes.component.html',
  styleUrls: ['./hospedajes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HospedajesComponent implements OnInit {

  hospedajes : any[] = [];

  constructor(
    private hospedajesService: HospedajesService
  ) { }

  ngOnInit(): void {

    this.hospedajesService.getHospedajes('100').subscribe(res => {
      console.log(res);
      this.hospedajes = res.servicios; 
    });
  }

}
