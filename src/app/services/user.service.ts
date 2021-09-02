import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'

import { LoginForm } from '../interfaces/login-form.interface';
import { SearchForm } from '../interfaces/search-form.interface';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

const base_url = environment.base_url;
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  loginUser(formData) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      })
    };

    formData['PasswordHash'] = formData.Password;
    formData['grant_type'] = 'password';

    const data = "UserName="+ formData['UserName'] +"&PasswordHash="+ formData['PasswordHash'] +"&Password="+ formData['Password'] +"&grant_type="+ formData['grant_type'];

    return this.http.post(`${base_url}/Token`, data, httpOptions)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('type_token', resp.token_type);
        localStorage.setItem('access_token', resp.access_token)
      }),
      map( resp => true ),
      catchError( error => of(error) )
    );

  }

  searchPatient(formData: SearchForm) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${ localStorage.getItem('type_token') } ${ localStorage.getItem('access_token') }`,
      })
    };

    return this.http.post(`${base_url}/api/Busqueda/ConsultarRegistro`, formData, httpOptions)
    .pipe(
      tap( (resp: any) => {
        
        if (localStorage.getItem('recordPatient')) {
          localStorage.removeItem('recordPatient');
        }

        localStorage.setItem('recordPatient', JSON.stringify(resp));
      }),
      map( resp => true ),
      catchError( error => of(false) )
    );

  }

}
