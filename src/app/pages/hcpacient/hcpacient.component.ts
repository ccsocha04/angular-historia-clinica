import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';

import { LoginForm } from 'src/app/interfaces/login-form.interface';

import Swal from 'sweetalert2';

import { EncrdecrService } from '../../services/encr-decr.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-hcpacient',
  templateUrl: './hcpacient.component.html',
  styles: [
  ]
})
export class HcpacientComponent implements OnInit {

  encryptURL: string;
  desencryptUser = [];

  constructor(
    private router: Router,
    private encrDecr: EncrdecrService,
    private userService: UserService) { }

  ngOnInit(): void {

    this.encryptURL = this.router.url;

    // TODO - Generar una función
    this.encryptURL = this.encryptURL.replace(/%20/g, '+');
    this.encryptURL = this.encryptURL.replace(/%2F/g, '/');
    this.encryptURL = this.encryptURL.split('?')[1];

    this.validateExternal(this.encryptURL);

    // var encrypted = this.EncrDecr.set('SYAC!SecretariaSaludCundinamarca', 'Usuario=999&Password=9653256&TipoDocumento=CC&Numero=79582123&Aplicacion=003&Fecha=23/09/2014&Ips=251260035301');
    // var decrypted = this.EncrDecr.get('SYAC!SecretariaSaludCundinamarca', encrypted);

    // console.log('Encrypted : ' + encrypted);
    // console.log('Encrypted : U2FsdGVkX18AAAAAAAAAAJXUvF0DsLKSqFJJboe PelfbrRDlDerJJSkgE90jSMox0sZNsTdRrDOJnGpEk0WFPF11K0wfLYcxbdf2UYOZgvG1YJFIIb/KT5grLGtVT/FvxqFQ1w4kAXa3wSUtal0BorMRn17NTF6wpq2Wu9cKSjY=');
    // console.log('Decrypted : ' + decrypted);
  }

  validateExternal(parameter: string) {

    this.encrDecr.validateUser(parameter)
      .subscribe(resp => {

        this.desencryptUser = resp;
        console.log(this.desencryptUser);

        const formData = {
          UserName: '',
          Password: '',
        };
        formData['UserName'] = this.desencryptUser["UserName"]
        formData['Password'] = this.desencryptUser['Password'];

        this.userService.loginUser(formData)
          .subscribe(resp => {

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
            recordQuery["Valores"][0] = this.desencryptUser["TipoDocumento"]
            recordQuery["Valores"][1] = this.desencryptUser["Numero"]

            this.userService.searchPatient(recordQuery)
              .subscribe(resp => {
                this.router.navigateByUrl('/');
              }, (err) => {
                Swal.fire('Error', err.error = 'Usuario no registrado - Search', 'error');
              });

          }, (err) => {
            Swal.fire('Error', err.error = 'Parámetros no validos - Login', 'error');
          });


      }, (err) => {
        Swal.fire('Error', err.error = 'Parámetros no validos - EncrypDecrip', 'error');
      });

  }

}
