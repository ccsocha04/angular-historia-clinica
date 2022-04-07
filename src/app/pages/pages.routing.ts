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
import { IndicationComponent } from './indication/indication.component';
import { HcpacientComponent } from './hcpacient/hcpacient.component';


const routes: Routes = [
    {
        path: 'HistoriaClinica',
        component: PagesComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: 'DatosPaciente', component: DashboardComponent, data: {titulo: 'Reporte del paciente', descripcion: '' } },
            { path: 'FoliosAtencion', component: InvoiceComponent, data: {titulo: 'Folios de atención', descripcion: '' } },
            { path: 'Diagnosticos', component: DiagnosisComponent, data: {titulo: 'Diagnósticos', descripcion: '' } },
            { path: 'Antecedentes', component: BackgroundComponent, data: {titulo: 'Antecedentes', descripcion: '' } },
            { path: 'Órdenes', component: OrdersComponent, data: {titulo: 'Órdenes', descripcion: '' } },
            { path: 'PlanManejo/Medicamentos', component: ManagementComponent, data: {titulo: 'Medicamentos', descripcion: '' } },
            { path: 'PlanManejo/Indicaciones', component: IndicationComponent, data: {titulo: 'Indicaciones', descripcion: '' } },
            { path: 'HCPaciente.html', component: HcpacientComponent, data: {titulo: 'Integración HIS - Historia Clínica', descripcion: '' } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
