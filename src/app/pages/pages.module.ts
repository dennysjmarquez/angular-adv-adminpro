import { NgModule  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import {SharedModule} from '../shared/shared.module';
import {ComponentsModule} from '../components/components.module';

// Components
import {DashboardPageComponent} from './dashboard/dashboard-page.component';
import {Grafica1PageComponent} from './grafica1/grafica1-page.component';
import {ProgressPageComponent} from './progress/progress-page.component';
import {PagesComponent} from './pages.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    Grafica1PageComponent,
    ProgressPageComponent,
    PagesComponent
  ],
  imports: [

    // RouterModule lo importamos porque se necesita las rutas  <router-outlet></router-outlet>
    // el modulo de las rutas se importa en app.modules y de esta forma imortando RouterModule las
    // reutilizamos de otra forma tendriamos que importarlas con un
    // import {AppRoutersModule} from './routers/app-routers.module';
    RouterModule,

    CommonModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
    DashboardPageComponent,
    Grafica1PageComponent,
    ProgressPageComponent,
    PagesComponent
  ]
})
export class PagesModule { }
