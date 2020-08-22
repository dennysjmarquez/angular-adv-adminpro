import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardPageComponent} from './dashboard/dashboard-page.component';
import {ProgressPageComponent} from './progress/progress-page.component';
import {Grafica1PageComponent} from './grafica1/grafica1-page.component';
import {AcountSettingPageComponent} from './acount-setting/acount-setting-page.component';
import {PromisePageComponent} from './promise/promise-page.component';
import {RxjsPageComponent} from './rxjs/rxjs-page.component';

const APP_ROUTES: Routes = [
  // Template principal
  {path: 'dashboard', component: PagesComponent,
    children: [
      { path: '', component: DashboardPageComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressPageComponent, data: { title: 'Progress Bar' } },
      { path: 'graph1', component: Grafica1PageComponent, data: { title: 'Graph1' } },
      { path: 'promise', component: PromisePageComponent, data: { title: 'Promise' } },
      { path: 'rxjs', component: RxjsPageComponent, data: { title: 'RxJs' } },
      { path: 'acount-setting', component: AcountSettingPageComponent, data: { title: 'Acount Setting' } },
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
export class PagesRouter { }





