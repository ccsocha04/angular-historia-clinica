import { Component } from '@angular/core';

import { Label, SingleDataSet, MultiDataSet, Color } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent {

  recordPatient = JSON.parse(localStorage.getItem('recordPatient'));
  dataLabels = [];
  dataChartLabels = [];
  dataSetValues = {};
  backgroundOptions = [
    '#3b7ddd', 
    '#ffc107', 
    '#dc3545',
    '#28a745',
    '#17a2b8',
    '#6c757d'
  ]
  agePatient: string = this.getAgePatient();

  // PolarArea - Tipo de atención
  public polarAreaChartLabels: Label[] = this.getLabels('TipoAtencion');
  public polarAreaChartData: SingleDataSet = this.getDataSet();
  public polarAreaChartColors: Array<any> = [{ backgroundColor: this.backgroundOptions }];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';

  // Doughnut - Atención por año
  public doughnutChartLabels: Label[] = this.getLabels('Atencion');
  public doughnutChartData: MultiDataSet = [
    this.getDataSet(),
  ];
  public doughnutChartColors: Array<any> = [{ backgroundColor: this.backgroundOptions }];
  public doughnutChartLegend = true;
  public doughnutChartType: ChartType = 'doughnut';

  // Barchart - Atención por hospital
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = this.getLabels('Hospital');
  public barChartData: ChartDataSets[] = [
    { data: this.getDataSet(), label: 'Hospital' },
  ];
  public barChartLegend = false;
  public barChartType: ChartType = 'horizontalBar';
  public barChartPlugins = [];
  public barChartColors: Color[] = [
    { backgroundColor: '#3b7ddd' },
  ]

  // Barchart - Atención por especialidad
  public barSpecChartOptions: ChartOptions = {
    responsive: true,
  };
  public barSpecChartLabels: Label[] = this.getLabels('Especialidad');
  public barSpecChartData: ChartDataSets[] = [
    { data: this.getDataSet(), label: 'Especialidad' },
  ];
  public barSpecChartLegend = false;
  public barSpecChartType: ChartType = 'horizontalBar';
  public barSpecChartPlugins = [];
  public barSpecChartColors: Color[] = [
    { backgroundColor: '#ffc107' },
  ]

  constructor() { }

  // Events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  getLabels( object: string ) {
    var chartLabels: Array<any> = [];
    switch (object) {
      case 'TipoAtencion':
        this.recordPatient.Folios.forEach(element => {
          if (element.TipoAtencion.ItemDescr === 'Ambulatorio') {
            element.TipoAtencion.ItemDescr = 'Consulta Externa';
          }
          chartLabels.push(element.TipoAtencion.ItemDescr);
        });    
        break;

      case 'AreaServicio':
        this.recordPatient.Folios.forEach(element => {
          chartLabels.push(element.AreaServicio.Nombre);
        });
        break;

      case 'Atencion':
        this.recordPatient.Folios.forEach(element => {
          var dateAtention = new Date(element.FechaAtencion);
          var yearAtention = dateAtention.getFullYear();
          chartLabels.push(yearAtention);
        });
        break;

      case 'Hospital':
        this.recordPatient.Folios.forEach(element => {
          chartLabels.push(element.IPS.Nombre);
        });
        break;

      case 'Especialidad':
        this.recordPatient.Folios.forEach(element => {
          chartLabels.push(element.Especialidad.Nombre);
        });
        break;
        
      default:
        break;
    }
    
    this.dataLabels = [...new Set(chartLabels)];
    this.getValues(chartLabels);

    return this.dataLabels.sort();
  }

  getValues(chart: Array<any>) {
    chart.forEach(val => {
      this.dataSetValues[val] = (this.dataSetValues[val] || 0) + 1;
    });
  }

  getDataSet() {
    var chartDataSet: Array<any> = [];
    this.dataLabels.forEach(value => {
      chartDataSet.push(this.dataSetValues[value])
    });
    return chartDataSet;
  }

  getAgePatient() {
    var today = new Date();
    var birthday = new Date(this.recordPatient.FechaNacimiento);

    var age = today.getFullYear() - birthday.getFullYear();
    var month = today.getMonth() - birthday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
        age--;
        if (month < 0) {
          month = 12 + month;
        }
        if (month === 0 && today.getDate() < birthday.getDate()) {
          month = 11;
        }

    }
    var stringAge = age + ' años ' + month + ' meses'

    return stringAge;
  }

}
