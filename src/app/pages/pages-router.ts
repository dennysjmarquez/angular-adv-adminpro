import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

// Guards
import { AuthGuard } from '../guards/auth.guard';

const APP_ROUTES: Routes = [
	// Template principal
	{
		path: 'dashboard',
		component: PagesComponent,
      canLoad: [AuthGuard],
      canActivate: [AuthGuard],
		loadChildren: () => import('./pages-child-router.module').then(module => module.PagesChildRouterModule),

		// Las rutas hijas se cargan con lazyload
		// children: [],
	},
];

const APP_ROUTING = RouterModule.forChild(APP_ROUTES);

@NgModule({
	declarations: [],
	imports: [CommonModule, APP_ROUTING],
	exports: [RouterModule],
})
export class PagesRouter {}
