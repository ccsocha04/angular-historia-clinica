import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';

import { DiagnosisData } from '../../interfaces/diagnosis-data.interface';


export interface DiagnosisTab {
  label: string;
  content: string;
}


export class DiagnosisClass {
  CodeDiagnosis: string;
  DateDiagnosis: string;
  Name: string;
  Hospital: string;
  Diagnosis_Principal: string;
  Diagnosis_Input: string;
  Diagnosis_Output: string;
  State: number
}

let DIAGNOSIS_INFORMATION: DiagnosisClass[] = []

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styles: [
  ]
})
export class DiagnosisComponent implements AfterViewInit, OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  filterEntity: DiagnosisClass;
  filterType: MatTableFilter;
  
  // Material Table
  displayedColumns: string[] = ['CodeDiagnosis', 'DateDiagnosis', 'Name', 'Hospital', 'Diagnosis_Principal', 'Diagnosis_Input', 'Diagnosis_Output', 'State'];
  dataSource: MatTableDataSource<DiagnosisData>;
  
  dataTableDiagnosis = true;
  dataDiagnosis = false;

  recordInvoice = [];
  recordDiagnosis = [];
  recordBackground = [];
  recordOrder = [];
  recordManagement = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.Diagnosticos.length }, (_, k) => this.getDataSource(k));
    DIAGNOSIS_INFORMATION = dataSource;

  }

  ngOnInit(): void {

    this.filterEntity = new DiagnosisClass();
    this.filterType = MatTableFilter.ANYWHERE;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(DIAGNOSIS_INFORMATION);
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  detailDiagnosis(id: number) {

    this.recordPatient.Folios.forEach(element => {
      if (element.Oid === id) {
        this.dataDiagnosis = true;
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

    this.dataTableDiagnosis = false;
    this.dataDiagnosis = true;

  }

  activeDiagnosis() {
    // Refresh actual page
    location.reload();
    this.dataDiagnosis = false;
    this.dataTableDiagnosis = true;
  }

  getDataSource(id: number): DiagnosisData {
    const diagnosis = this.recordPatient.Diagnosticos[id];
    const dateDiagnosis = diagnosis.FolioAtencion.FechaAtencion.substring(0, 10) + ' - ' + diagnosis.FolioAtencion.FechaAtencion.substring(11);
    return {
      CodeDiagnosis: diagnosis.Diagnostico.Codigo,
      DateDiagnosis: dateDiagnosis,
      Name: diagnosis.Diagnostico.Nombre,
      Hospital: diagnosis.FolioAtencion.IPS.Nombre,
      Diagnosis_Principal: diagnosis.DiagnosticoPrincipal,
      Diagnosis_Input: diagnosis.DiagnosticoIngreso,
      Diagnosis_Output: diagnosis.DiagnosticoEgreso,
      State: diagnosis.FolioAtencion.Oid
    }
  }

}