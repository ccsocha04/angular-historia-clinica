import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    UserName: [localStorage.getItem('UserName') || '', Validators.required],
    Password: ['XXXXX', Validators.required],
    userRemember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService) { }

  login() {
    
    this.userService.loginUser( this.loginForm.value )
      .subscribe(resp => {
        if (localStorage.getItem('UserName')) {
          localStorage.removeItem('UserName');
        }
        localStorage.setItem('UserName', this.loginForm.get('UserName').value);
        this.router.navigateByUrl('/search');
      }, (err) => {
        Swal.fire('Error', err.error.error_description, 'error');
      });

  }

}
