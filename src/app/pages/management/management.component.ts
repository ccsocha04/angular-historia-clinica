import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';

import { ManagementData, IndicationData } from '../../interfaces/management-data.interface';


export class ManagementClass {
  CodeManagement: string;
  DateManagement: string;
  Name: string;
  Amount: number;
  Hospital: string;
  Observations: string;
  State: number
}

export class IndicationClass {
  DateIndication: string;
  Hospital: string;
  Observations: string;
  State: number
}

let MANAGEMENT_INFORMATION: ManagementClass[] = []
let INDICATION_INFORMATION: IndicationClass[] = []

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styles: [
  ]
})
export class ManagementComponent implements AfterViewInit, OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  filterEntity: ManagementClass;
  filterType: MatTableFilter;

  // Material Table
  displayedColumns: string[] = ['CodeManagement', 'DateManagement', 'Name', 'Amount', 'Hospital', 'Observations', 'State'];
  dataSource: MatTableDataSource<ManagementData>;

  dataTableManagement = true;
  dataManagement = false;

  recordInvoice = [];
  recordDiagnosis = [];
  recordBackground = [];
  recordOrder = [];
  recordManagement = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.PlanManejo.length }, (_, k) => this.getDataSource(k));
    const dataSourceIndication = Array.from({ length: this.recordPatient.PlanManejo.length }, (_, l) => this.getDataSourceIndication(l));
    MANAGEMENT_INFORMATION = dataSource;
  }

  ngOnInit(): void {
    this.filterEntity = new ManagementClass();
    this.filterType = MatTableFilter.ANYWHERE;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(MANAGEMENT_INFORMATION);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  detailManagement(id: number) {
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
    this.dataTableManagement = false;
    this.dataManagement = true;
  }

  activeManagement() {
    // Refresh actual page
    location.reload();
    this.dataManagement = false;
    this.dataTableManagement = true;
  }

  getDataSource(id: number): ManagementData {
    const management = this.recordPatient.PlanManejo[id];
    return {
      CodeManagement: management.Medicamento.Codigo,
      DateManagement: management.FolioAtencion.FechaAtencion,
      Name: management.Medicamento.Nombre,
      Amount: management.Cantidad,
      Hospital: management.FolioAtencion.IPS.Nombre,
      Observations: management.Observacion,
      State: management.FolioAtencion.Oid
    }
  }

  getDataSourceIndication(id: number): IndicationData {
    const management = this.recordPatient.PlanManejo[id];
    const dateManagement = management.FolioAtencion.FechaAtencion.substring(0, 10) + ' - ' + management.FolioAtencion.FechaAtencion.substring(11);
    if (management.TipoPlanManejo.ItemDescr === 'Indicacion') {
      return {
        DateIndication: dateManagement,
        Hospital: management.FolioAtencion.IPS.Nombre,
        Observations: management.Observacion,
        State: management.FolioAtencion.Oid
      }
    }
  }

}
