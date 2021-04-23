import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-create-hospedaje',
  templateUrl: './create-hospedaje.component.html',
  styleUrls: ['./create-hospedaje.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateHospedajeComponent implements OnInit {
  cities: City[];

  selectedCity: City;

  hospedajeForm: FormGroup; 
  uploadedFiles: FileUpload[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.selectedCity = this.cities[3];
  }

  ngOnInit(): void {
    this.setHospedajeForm();
  }

  setHospedajeForm() {
    this.hospedajeForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      locacion_id: ['', [Validators.required]],
      empresa_id : ['', [Validators.required]],
      categoria_id : ['', [Validators.required]],
      costo : ['', [Validators.required]],
      horario : ['', [Validators.required]],
      descripcion : ['', [Validators.required]],
      fotos : ['', [Validators.required]]
    });
  }

  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

   // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

}
