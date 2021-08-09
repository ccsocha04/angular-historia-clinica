import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styles: [
  ]
})
export class BackgroundComponent implements OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  constructor() { }

  ngOnInit(): void {
  }

}
