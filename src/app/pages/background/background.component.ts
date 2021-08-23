import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BackgroundData } from '../../interfaces/background-data.interface';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styles: [
  ]
})
export class BackgroundComponent implements AfterViewInit, OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

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

  filterValues = {};
  filterSelectObj = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.Antecedentes.length }, (_, k) => this.getDataSource(k));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);

    this.filterSelectObj = [
      {
        name: 'TIPO DE ANTECEDENTE',
        columnProp: 'TypeBackground',
        options: []
      },{
        name: 'FECHA',
        columnProp: 'DateBackground',
        options: []
      },{
        name: 'DETALLE',
        columnProp: 'Detail',
        options: []
      },{
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
    return {
      TypeBackground: background.TipoAntecedente.ItemDescr,
      DateBackground: background.Fecha,
      Detail: background.Detalle,
      Hospital: background.FolioAtencion.IPS.Nombre,
      State: background.FolioAtencion.Oid
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
    console.log(this.filterValues); 
    this.dataSource.filter = JSON.stringify(this.filterValues);
  
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function(data: any, filter: string): boolean {

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
