import { Component, OnInit } from '@angular/core';

import { Label, SingleDataSet, Color } from 'ng2-charts'
import { ChartType } from 'chart.js'
import { TestBed } from '@angular/core/testing';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));

  // PolarArea
  public polarAreaChartLabels: Label[] = this.getLabels();
  public polarAreaChartData: SingleDataSet = [6, 3, 11];
  public polarAreaChartColors: Array<any> = [{ backgroundColor: [ '#3b7ddd', '#ffc107', '#dc3545'] }];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';

  constructor() { }

  ngOnInit(): void {

  }

  // Events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  getLabels() {
    
    var chartLabels: Array<any> = [];

    this.recordPatient.Folios.forEach(element => {
      chartLabels.push(element.AreaServicio.Nombre);
    });

    return [...new Set(chartLabels)];
  }

  getDataSet() {
    console.log('generar lógica');
    
  }

}
