import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ManagementData } from '../../interfaces/management-data.interface';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styles: [
  ]
})
export class ManagementComponent implements AfterViewInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  // Material Table
  displayedColumns: string[] = ['CodeManagement', 'DateManagement', 'Name', 'TypeManagement', 'Amount', 'Observations', 'State'];
  dataSource: MatTableDataSource<ManagementData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.PlanManejo.length }, (_, k) => this.getDataSource(k));
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

  getDataSource(id: number): ManagementData {
    const management = this.recordPatient.PlanManejo[id];
    return {
      CodeManagement: management.Medicamento.Codigo,
      DateManagement: management.FolioAtencion.FechaAtencion,
      Name: management.Medicamento.Nombre,
      TypeManagement: management.TipoPlanManejo.ItemDescr,
      Amount: management.Cantidad,
      Hospital: management.FolioAtencion.IPS.Nombre,
      Observations: management.Observacion,
      State: 'Ver Folio ->'
    }
  }

}
