import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { LoginForm } from '../interfaces/login-form.interface';
import { SearchForm } from '../interfaces/search-form.interface';

import { environment } from 'src/environments/environment';


const base_url = environment.base_url;
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  get typeToken(): string {
    return localStorage.getItem('type_token');
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  get userName(): string {
    return localStorage.getItem('UserName');
  }

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
      })
    );
  }

  validateUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${ localStorage.getItem('type_token') } ${ localStorage.getItem('access_token') }`,
      })
    };
    return this.http.get(`${base_url}/api/General/ConsultarUsuario?userName=${ this.userName }`, httpOptions)
    .pipe(
      map( (resp: any) => {
        return true;
      }),
      catchError( error => of(false) )
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
