import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styles: [
  ]
})
export class DiagnosisComponent implements OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  constructor() { }

  ngOnInit(): void {
  }

}
