import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardPageComponent} from './dashboard/dashboard-page.component';
import {ProgressPageComponent} from './progress/progress-page.component';
import {Grafica1PageComponent} from './grafica1/grafica1-page.component';

const APP_ROUTES: Routes = [
  // Template principal
  {path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardPageComponent },
      { path: 'progress', component: ProgressPageComponent },
      { path: 'grafica1', component: Grafica1PageComponent },
    ]
  }
];

const APP_ROUTING = RouterModule.forChild(APP_ROUTES);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    APP_ROUTING
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRouterModule { }





