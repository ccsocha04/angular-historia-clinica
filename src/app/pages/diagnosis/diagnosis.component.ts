import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DiagnosisData } from '../../interfaces/diagnosis-data.interface';


@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styles: [
  ]
})
export class DiagnosisComponent implements AfterViewInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  // Material Table
  displayedColumns: string[] = ['CodeDiagnosis', 'DateDiagnosis', 'Name', 'Hospital', 'Diagnosis_Principal', 'Diagnosis_Input', 'Diagnosis_Output', 'State'];
  dataSource: MatTableDataSource<DiagnosisData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.Diagnosticos.length }, (_, k) => this.getDataSource(k));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  getDataSource(id: number): DiagnosisData {
    const diagnosis = this.recordPatient.Diagnosticos[id];
    return {
      CodeDiagnosis: diagnosis.Diagnostico.Codigo,
      DateDiagnosis: diagnosis.FolioAtencion.FechaAtencion,
      Name: diagnosis.Diagnostico.Nombre,
      Hospital: diagnosis.FolioAtencion.IPS.Nombre,
      Diagnosis_Principal: diagnosis.DiagnosticoPrincipal,
      Diagnosis_Input: diagnosis.DiagnosticoIngreso,
      Diagnosis_Output: diagnosis.DiagnosticoEgreso,
      State: 'Ver Folio->'
    }
  }

}