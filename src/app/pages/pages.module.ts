import { NgModule  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Components
import {DashboardComponent} from './dashboard/dashboard.component';
import {Grafica1Component} from './grafica1/grafica1.component';
import {ProgressComponent} from './progress/progress.component';
import {PagesComponent} from './pages.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    // RouterModule lo importamos porque se necesita las rutas  <router-outlet></router-outlet>
    // el modulo de las rutas se importa en app.modules y de esta forma imortando RouterModule las
    // reutilizamos de otra forma tendriamos que importarlas con un
    // import {AppRoutersModule} from './routers/app-routers.module';
    RouterModule
  ],
  exports: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent
  ]
})
export class PagesModule { }
