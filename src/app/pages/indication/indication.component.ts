import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';

import { IndicationData } from 'src/app/interfaces/indication-data.interface';


export class IndicationClass {
  DateIndication: string;
  Hospital: string;
  Observations: string;
  State: number
}

let INDICATION_INFORMATION: IndicationClass[] = []

@Component({
  selector: 'app-indication',
  templateUrl: './indication.component.html',
  styleUrls: [

  ]
})
export class IndicationComponent implements OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  filterEntity: IndicationClass;;
  filterType: MatTableFilter;

  // Material Table
  displayedColumns: string[] = ['DateIndication', 'Hospital', 'Observations', 'State'];
  dataSource: MatTableDataSource<IndicationData>;

  dataTableIndication = true;
  dataIndication = false;

  recordInvoice = [];
  recordDiagnosis = [];
  recordBackground = [];
  recordOrder = [];
  recordManagement = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { 
    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.PlanManejo.filter(element => element.TipoPlanManejo.ItemDescr == "Indicacion").length }, (_, k) => this.getDataSource(k));
    INDICATION_INFORMATION = dataSource;
  }

  ngOnInit(): void {
    this.filterEntity = new IndicationClass();
    this.filterType = MatTableFilter.ANYWHERE;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(INDICATION_INFORMATION);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  detailIndication(id: number) {
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
    this.dataTableIndication = false;
    this.dataIndication = true;
  }

  activeIndication() {
    // Refresh actual page
    location.reload();
    this.dataIndication = false;
    this.dataTableIndication = true;
  }

  getDataSource(id: number): IndicationData { 
    const indication = this.recordPatient.PlanManejo.filter(element => element.TipoPlanManejo.ItemDescr == "Indicacion")[id];
    const dateIndication = indication.FolioAtencion.FechaAtencion.substring(0, 10) + ' - ' + indication.FolioAtencion.FechaAtencion.substring(11);
    return {
      DateIndication: dateIndication,
      Hospital: indication.FolioAtencion.IPS.Nombre,
      Observations: indication.Observacion,
      State: indication.FolioAtencion.Oid
    }
  }

}
