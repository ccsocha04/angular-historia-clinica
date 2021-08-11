import { AfterViewInit, Component, ViewChild } from '@angular/core';

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
export class OrdersComponent implements AfterViewInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  // Material Table
  displayedColumns: string[] = ['CodeOrder', 'DateOrder', 'Name', 'Amount', 'Hospital', 'State'];
  dataSource: MatTableDataSource<OrdersData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.ServiciosIPS.length }, (_, k) => this.getDataSource(k));
    console.log(dataSource);
    
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

  getDataSource(id: number): OrdersData {
    const orders = this.recordPatient.ServiciosIPS[id];
    return {
      CodeOrder: orders.ServicioIPS.Codigo,
      DateOrder: orders.FolioAtencion.FechaAtencion,
      Name: orders.ServicioIPS.Nombre,
      Amount: orders.Cantidad,
      Hospital: orders.FolioAtencion.IPS.Nombre,
      State: 'Ver Folio ->'
    }
  }

}
