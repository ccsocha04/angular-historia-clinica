import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Mdulos MatTable
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

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
import { HcpacientComponent } from './hcpacient/hcpacient.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InvoiceComponent,
    DiagnosisComponent, 
    OrdersComponent, 
    BackgroundComponent,
    ManagementComponent, 
    HcpacientComponent,
    PagesComponent, 
  ],
  exports: [
    DashboardComponent,
    InvoiceComponent,
    DiagnosisComponent, 
    OrdersComponent, 
    BackgroundComponent,
    ManagementComponent, 
    HcpacientComponent,
    PagesComponent,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatTabsModule
    
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
    MatTabsModule

  ]
})
export class PagesModule { }
