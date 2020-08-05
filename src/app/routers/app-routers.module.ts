import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Paginas
import {DashboardComponent} from '../pages/dashboard/dashboard.component';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {ProgressComponent} from '../pages/progress/progress.component';
import {Grafica1Component} from '../pages/grafica1/grafica1.component';
import {NopagefoundComponent} from '../pages/nopagefound/nopagefound.component';
import {PagesComponent} from '../pages/pages.component';

const APP_ROUTES: Routes = [


  // Template principal
  {path: '', component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: '',  pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**',  component: NopagefoundComponent }

];


const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, {useHash: true});

@NgModule({
  declarations: [],
  imports: [
    APP_ROUTING
  ],
  exports: [RouterModule]
})
export class AppRoutersModule { }
