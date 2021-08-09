import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));
  
  constructor( ) { }

  ngOnInit(): void {
    
  }
  
   
}
