import { AfterViewInit, Component, ViewChild } from '@angular/core';

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
export class BackgroundComponent implements AfterViewInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

    // Material Table
    displayedColumns: string[] = ['TypeBackground', 'DateBackground', 'Detail', 'Hospital', 'State'];
    dataSource: MatTableDataSource<BackgroundData>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor() { 

    // DataSource
    const dataSource = Array.from({ length: this.recordPatient.Antecedentes.length }, (_, k) => this.getDataSource(k));
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

  getDataSource(id: number): BackgroundData {
    const background = this.recordPatient.Antecedentes[id];
    return {
      TypeBackground: background.TipoAntecedente.ItemDescr,
      DateBackground: background.Fecha,
      Detail: background.Detalle,
      Hospital: background.FolioAtencion.IPS.Nombre,
      State: 'Ver Folio ->'
    }
  }

}
