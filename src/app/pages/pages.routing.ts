import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { BackgroundComponent } from './background/background.component';
import { OrdersComponent } from './orders/orders.component';
import { ManagementComponent } from './management/management.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, data: {titulo: 'Paciente' } },
        ]
    },
    {
        path: 'invoice',
        component: PagesComponent,
        children: [
            { path: '', component: InvoiceComponent, data: {titulo: 'Folios de atención' } },
        ]
    },
    {
        path: 'diagnosis',
        component: PagesComponent,
        children: [
            { path: '', component: DiagnosisComponent, data: {titulo: 'Diagnósticos' } },
        ]
    },
    {
        path: 'background',
        component: PagesComponent,
        children: [
            { path: '', component: BackgroundComponent, data: {titulo: 'Antecedentes' } }
        ]
    },
    {
        path: 'orders',
        component: PagesComponent,
        children: [
            { path: '', component: OrdersComponent, data: {titulo: 'Ordenes' } }
        ]
    },
    {
        path: 'management',
        component: PagesComponent,
        children: [
            { path: '', component: ManagementComponent, data: {titulo: 'Plan de Manejo' } }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
