import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Paginas
import {ErrorPage404Component} from '../statusCodesPages/404/errorpage404.component';

// Routers
import {PagesRouter} from '../pages/pages-router';
import {AuthRouter} from '../auth/auth-router';

const APP_ROUTES: Routes = [

  { path: '',  pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**',  component: ErrorPage404Component }

];

const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, { useHash: true} );

@NgModule({
  declarations: [],
  imports: [
    APP_ROUTING,
    PagesRouter,
    AuthRouter
  ],
  exports: [RouterModule]
})
export class AppRoutersModule {  }
