import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  constructor() { }

  ngOnInit(): void {
  }

}
