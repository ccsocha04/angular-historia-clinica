import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { InvoiceData } from '../../interfaces/inovice-data.interface';


export interface InvoiceTab {
  label: string;
  content: string;
}


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ]
})
export class InvoiceComponent implements AfterViewInit, OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

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

  filterValues = {};
  filterSelectObj = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.Folios.length }, (_, k) => this.getDataSource(k));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);

    this.filterSelectObj = [
      {
        name: 'TIPO DE ATENCIÓN',
        columnProp: 'TypeAtention',
        options: []
      }, {
        name: 'FECHA',
        columnProp: 'DateAtention',
        options: []
      }, {
        name: 'ESPECIALIDAD',
        columnProp: 'Specialty',
        options: []
      }, {
        name: 'HOSPITAL',
        columnProp: 'Hospital',
        options: []
      }
    ];

  }

  ngOnInit(): void {
    this.filterSelectObj.filter((object) => {
      object.options = this.getFilterObject(this.dataSource, object.columnProp);
    });
    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
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

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: string) {

    const uniqChk = [];
    fullObj.filteredData.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;

  }

  // Called on Filter change
  filterChange(filter: any, event: Event) {
    this.filterValues[filter.columnProp] = (event.target as HTMLSelectElement).value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {

      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;

      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch();
    }

    return filterFunction;
  }

}