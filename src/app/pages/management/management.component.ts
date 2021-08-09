import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styles: [
  ]
})
export class ManagementComponent implements OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  constructor() { }

  ngOnInit(): void {
  }

}
