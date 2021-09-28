import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';

import { OrdersData } from '../../interfaces/orders-data.interface';


export class OrderClass {
  CodeOrder: string;
  DateOrder: string;
  Name: string;
  Amount: number;
  Hospital: string;
  State: number
}

let ORDER_INFORMATION: OrderClass[] = []

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements AfterViewInit, OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  filterEntity: OrderClass;
  filterType: MatTableFilter;

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.ServiciosIPS.length }, (_, k) => this.getDataSource(k));
    ORDER_INFORMATION = dataSource;
  }

  ngOnInit(): void {
    this.filterEntity = new OrderClass();
    this.filterType = MatTableFilter.ANYWHERE;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ORDER_INFORMATION);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    const dateOrders = orders.FolioAtencion.FechaAtencion.substring(0, 10) + ' - ' + orders.FolioAtencion.FechaAtencion.substring(11);
    return {
      CodeOrder: orders.ServicioIPS.Codigo,
      DateOrder: dateOrders,
      Name: orders.ServicioIPS.Nombre,
      Amount: orders.Cantidad,
      Hospital: orders.FolioAtencion.IPS.Nombre,
      State: orders.FolioAtencion.Oid
    }
  }

}
