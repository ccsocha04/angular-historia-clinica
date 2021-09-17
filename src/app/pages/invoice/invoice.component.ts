import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';

import { InvoiceData } from '../../interfaces/inovice-data.interface';


export class InvoiceClass {
  TypeAtention: string;
  DateAtention: string;
  Specialty: string;
  Hospital: string;
  State: number
}

let INVOICE_INFORMATION: InvoiceClass[] = []

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ]
})
export class InvoiceComponent implements AfterViewInit, OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  filterEntity: InvoiceClass;
  filterType: MatTableFilter;

  // Material Table
  displayedColumns: string[] = ['TypeAtention', 'DateAtention', 'Specialty', 'Hospital', 'State'];
  dataSource: MatTableDataSource<InvoiceData>;

  dataTableInvoice = true;
  dataInvoice = false;

  recordInvoice = [];
  recordDiagnosis = [];
  recordBackground = [];
  recordOrder = [];
  recordManagement = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.Folios.length }, (_, k) => this.getDataSource(k));
    INVOICE_INFORMATION = dataSource;
  }

  ngOnInit(): void {
    this.filterEntity = new InvoiceClass();
    this.filterType = MatTableFilter.ANYWHERE;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(INVOICE_INFORMATION);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  detailInvoice(id: number) {
    this.recordPatient.Folios.forEach(element => {
      if (element.Oid === id) {
        this.recordInvoice = element;
      }
    });
    this.recordPatient.Diagnosticos.forEach(element => {
      if (element.FolioAtencion.Oid === id) {
        this.recordDiagnosis.push(element);
      }
    });
    this.recordPatient.Antecedentes.forEach(element => {
      if (element.FolioAtencion.Oid === id) {
        this.recordBackground.push(element);
      }
    });
    this.recordPatient.ServiciosIPS.forEach(element => {
      if (element.FolioAtencion.Oid === id) {
        this.recordOrder.push(element);
      }
    });
    this.recordPatient.PlanManejo.forEach(element => {
      if (element.FolioAtencion.Oid === id) {
        this.recordManagement.push(element);
      }
    });
    this.dataTableInvoice = false;
    this.dataInvoice = true;
  }

  activeInvoice() {
    // Refresh actual page
    location.reload();
    this.dataInvoice = false;
    this.dataTableInvoice = true;
  }

  getDataSource(id: number): InvoiceData {
    const invoice = this.recordPatient.Folios[id];
    return {
      TypeAtention: invoice.TipoAtencion.ItemDescr,
      DateAtention: invoice.FechaAtencion,
      Specialty: invoice.Especialidad.Nombre,
      Hospital: invoice.IPS.Nombre,
      State: invoice.Oid
    }
  }

}