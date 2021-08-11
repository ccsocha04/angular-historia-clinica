import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { InvoiceData } from '../../interfaces/inovice-data.interface';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ]
})
export class InvoiceComponent implements AfterViewInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  // Material Table
  displayedColumns: string[] = ['TypeAtention', 'DateAtention', 'Specialty', 'Hospital', 'State'];
  dataSource: MatTableDataSource<InvoiceData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValues = [];
  filterSelectObj = [];

  constructor() {

    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.Folios.length }, (_, k) => this.getDataSource(k));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);

    this.filterSelectObj = [
      {
        name: 'TypeAtention',
        columnProp: 'TypeAtention',
        options: []
      }, {
        name: 'DateAtention',
        columnProp: 'DateAtention',
        options: []
      }, {
        name: 'Specialty',
        columnProp: 'Specialty',
        options: []
      }, {
        name: 'Hospital',
        columnProp: 'Hospital',
        options: []
      }
    ]
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

  getDataSource(id: number): InvoiceData {
    const invoice = this.recordPatient.Folios[id];
    return {
      TypeAtention: invoice.TipoAtencion.ItemDescr,
      DateAtention: invoice.FechaAtencion,
      Specialty: invoice.Especialidad.Nombre,
      Hospital: invoice.IPS.Nombre,
      State: 'Ver Folio ->'
    }
  }

}