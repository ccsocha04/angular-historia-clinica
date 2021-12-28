import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  userName = localStorage.getItem('UserName');

  constructor( private userService: UserService ) { }

  logout() {
    this.userService.logoutUser();
  }

  ngOnInit(): void {
  }

}
