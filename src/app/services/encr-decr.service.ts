import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

import * as CryptoJS from 'crypto-js';

import { UserService } from './user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EncrdecrService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  set(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
      {
        keySize: 256,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  get(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 256,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  validateUser(param: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      })
    };
    
    let data = `Parametro=${param}=`;

    return this.http.post(`${base_url}/api/Account/ValidarExterno`, data, httpOptions)
      .pipe(
        tap((resp: any) => {
          console.log(resp);
        })
      );

  }

}
