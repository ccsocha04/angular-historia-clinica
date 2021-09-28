import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { BackgroundComponent } from './background/background.component';
import { OrdersComponent } from './orders/orders.component';
import { ManagementComponent } from './management/management.component';
import { HcpacientComponent } from './hcpacient/hcpacient.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: {titulo: 'Paciente', descripcion: 'Dashboard' } },
        ]
    },
    {
        path: 'invoice',
        component: PagesComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: '', component: InvoiceComponent, data: {titulo: 'Folios de atención', descripcion: 'Paciente' } },
        ]
    },
    {
        path: 'diagnosis',
        component: PagesComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DiagnosisComponent, data: {titulo: 'Diagnósticos', descripcion: 'Paciente' } },
        ]
    },
    {
        path: 'background',
        component: PagesComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: '', component: BackgroundComponent, data: {titulo: 'Antecedentes', descripcion: 'Paciente' } }
        ]
    },
    {
        path: 'orders',
        component: PagesComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: '', component: OrdersComponent, data: {titulo: 'Ordenes', descripcion: 'Paciente' } }
        ]
    },
    {
        path: 'management',
        component: PagesComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: '', component: ManagementComponent, data: {titulo: 'Plan de Manejo', descripcion: 'Paciente' } }
        ]
    },
    {
        path: 'HCPaciente',
        component: PagesComponent,
        children: [
            { path: '', component: HcpacientComponent, data: {titulo: 'Integración HIS - Historia Clínica', descripcion: 'Paciente' } }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
