import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';

import { BackgroundData } from '../../interfaces/background-data.interface';


export class BackgroundClass {
  TypeBackground: string;
  DateBackground: string;
  Detail: string;
  Hospital: string;
  State: number
}

let BACKGROUND_INFORMATION: BackgroundClass[] = []

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styles: [
  ]
})
export class BackgroundComponent implements AfterViewInit, OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  filterEntity: BackgroundClass;
  filterType: MatTableFilter;

  // Material Table
  displayedColumns: string[] = ['TypeBackground', 'DateBackground', 'Detail', 'Hospital', 'State'];
  dataSource: MatTableDataSource<BackgroundData>;
  
  dataTableBackground = true;
  dataBackground = false;

  recordInvoice = [];
  recordDiagnosis = [];
  recordBackground = [];
  recordOrder = [];
  recordManagement = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.Antecedentes.length }, (_, k) => this.getDataSource(k));
    BACKGROUND_INFORMATION = dataSource;
  }

  ngOnInit(): void {
    this.filterEntity = new BackgroundClass();
    this.filterType = MatTableFilter.ANYWHERE;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(BACKGROUND_INFORMATION);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  detailBackground(id: number) {
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
    this.dataTableBackground = false;
    this.dataBackground = true;
  }

  activeBackground() {
    // Refresh actual page
    location.reload();
    this.dataBackground = false;
    this.dataTableBackground = true;
  }

  getDataSource(id: number): BackgroundData {
    const background = this.recordPatient.Antecedentes[id];
    const dateBackground = background.Fecha.substring(0, 10) + ' - ' + background.Fecha.substring(11)
    return {
      TypeBackground: background.TipoAntecedente.ItemDescr,
      DateBackground: dateBackground,
      Detail: background.Detalle,
      Hospital: background.FolioAtencion.IPS.Nombre,
      State: background.FolioAtencion.Oid
    }
  }

}
