import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { BackgroundComponent } from './background/background.component';
import { OrdersComponent } from './orders/orders.component';
import { ManagementComponent } from './management/management.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InvoiceComponent,
    DiagnosisComponent, 
    OrdersComponent, 
    BackgroundComponent,
    ManagementComponent, 
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    InvoiceComponent,
    DiagnosisComponent, 
    OrdersComponent, 
    BackgroundComponent,
    ManagementComponent, 
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
