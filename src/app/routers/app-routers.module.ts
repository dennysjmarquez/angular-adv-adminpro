import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Paginas
import {ErrorPage404Component} from '../statusCodesPages/404/errorpage404.component';

// Routers
import {PagesRouterModule} from '../pages/pages-router.module';
import {AuthRouterModule} from '../auth/auth-router.module';

const APP_ROUTES: Routes = [

  { path: '',  pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**',  component: ErrorPage404Component }

];

const APP_ROUTING = RouterModule.forRoot( APP_ROUTES, { useHash: true} );

@NgModule({
  declarations: [],
  imports: [
    APP_ROUTING,
    PagesRouterModule,
    AuthRouterModule
  ],
  exports: [RouterModule]
})
export class AppRoutersModule {  }
