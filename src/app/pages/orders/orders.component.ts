import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { OrdersData } from '../../interfaces/orders-data.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements AfterViewInit, OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  // Material Table
  displayedColumns: string[] = ['CodeOrder', 'DateOrder', 'Name', 'Amount', 'Hospital', 'State'];
  dataSource: MatTableDataSource<OrdersData>;
  
  dataTableOrders = true;
  dataOrders = false;

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
    const dataSource = Array.from({ length: this.recordPatient.ServiciosIPS.length }, (_, k) => this.getDataSource(k));
    console.log(dataSource);
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);

    this.filterSelectObj = [
      {
        name: 'CÓDIGO ORDEN',
        columnProp: 'CodeOrder',
        options: []
      },{
        name: 'FECHA',
        columnProp: 'DateOrder',
        options: []
      },{
        name: 'NOMBRE',
        columnProp: 'Name',
        options: []
      },{
        name: 'CANTIDAD',
        columnProp: 'Amount',
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

  detailOrders(id: number) {
    
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

    this.dataTableOrders = false;
    this.dataOrders = true;

  }

  activeOrders() {

    // Refresh actual page
    location.reload();
    this.dataOrders = false;
    this.dataTableOrders = true;
  }

  getDataSource(id: number): OrdersData {
    const orders = this.recordPatient.ServiciosIPS[id];
    return {
      CodeOrder: orders.ServicioIPS.Codigo,
      DateOrder: orders.FolioAtencion.FechaAtencion,
      Name: orders.ServicioIPS.Nombre,
      Amount: orders.Cantidad,
      Hospital: orders.FolioAtencion.IPS.Nombre,
      State: orders.FolioAtencion.Oid
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
