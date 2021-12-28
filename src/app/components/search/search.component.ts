import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public formSubmitted = false;
  
  public searchForm = this.fb.group({
    DocumentType: [ '0', Validators.required ],
    DocumentNumber: [ '35536558', Validators.required ]
  });

  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone) { }

  search() {
    
    const recordQuery: any = {
      "Codigo": "GEENPaciente",
      "Valores": [
        "",
        ""
      ],
      "Entidad": "GEENPaciente",
      "Clase": "GECLPaciente",
      "Campos": [
        "TipoDocumento",
        "Documento"
      ]
    };
    recordQuery["Valores"][0] = this.searchForm.get('DocumentType').value;
    recordQuery["Valores"][1] = this.searchForm.get('DocumentNumber').value;

    this.userService.searchPatient( recordQuery )
      .subscribe( resp => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/HistoriaClinica/DatosPaciente');
        })
      }, (err) => {
        Swal.fire('Error', err.error ='Paciente no registrado', 'error');
      });

  }

}
