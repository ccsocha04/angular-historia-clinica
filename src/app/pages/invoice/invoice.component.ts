import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ]
})
export class InvoiceComponent implements OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  constructor() { }

  ngOnInit(): void {
  }

}
