import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Grafica1Component} from './grafica1/grafica1.component';

const APP_ROUTES: Routes = [
  // Template principal
  {path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
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





