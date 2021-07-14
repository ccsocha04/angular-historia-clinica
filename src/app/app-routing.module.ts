import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
