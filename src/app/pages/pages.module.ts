import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Mdulos MatTable
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableFilterModule } from 'mat-table-filter';
import { MatIconModule } from '@angular/material/icon';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { ChartsModule } from 'ng2-charts';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { BackgroundComponent } from './background/background.component';
import { OrdersComponent } from './orders/orders.component';
import { ManagementComponent } from './management/management.component';
import { IndicationComponent } from './indication/indication.component';
import { HcpacientComponent } from './hcpacient/hcpacient.component';
import { PagesComponent } from './pages.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    InvoiceComponent,
    DiagnosisComponent, 
    OrdersComponent, 
    BackgroundComponent,
    ManagementComponent,
    IndicationComponent, 
    HcpacientComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableFilterModule,
    MatIconModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    InvoiceComponent,
    DiagnosisComponent, 
    OrdersComponent, 
    BackgroundComponent,
    ManagementComponent,
    IndicationComponent, 
    HcpacientComponent,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableFilterModule,
    MatIconModule
  ]
})

export class PagesModule { }
