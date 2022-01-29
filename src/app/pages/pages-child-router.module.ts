import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPageComponent } from './dashboard/dashboard-page.component';
import { ProgressPageComponent } from './progress/progress-page.component';
import { Grafica1PageComponent } from './grafica1/grafica1-page.component';
import { AcountSettingPageComponent } from './acount-setting/acount-setting-page.component';
import { PromisePageComponent } from './promise/promise-page.component';
import { RxjsPageComponent } from './rxjs/rxjs-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import { UsersPageComponent } from './maintenance/users/users-page.component';
import { MedicosPageComponent } from './maintenance/medicos/medicos-page.component';
import { HospitalsPageComponent } from './maintenance/hospitals/hospitals-page.component';
import { MedicoPageComponent } from './maintenance/medicos/medico/medico-page.component';
import { SearchesComponent } from './searches/searches.component';

// Guards
import { RolGuard } from '../guards/rol.guard';

const APP_ROUTES: Routes = [
	{ path: '', component: DashboardPageComponent, data: { title: 'Dashboard' } },
	{ path: 'progress', component: ProgressPageComponent, data: { title: 'Progress Bar' } },
	{ path: 'graph1', component: Grafica1PageComponent, data: { title: 'Graph1' } },
	{ path: 'promise', component: PromisePageComponent, data: { title: 'Promise' } },
	{ path: 'rxjs', component: RxjsPageComponent, data: { title: 'RxJs' } },
	{ path: 'acount-setting', component: AcountSettingPageComponent, data: { title: 'Acount Setting' } },
	{ path: 'profile', component: ProfilePageComponent, data: { title: 'Profile' } },
	{ path: 'searches/:q', component: SearchesComponent, data: { title: 'Búsqueda globales' } },

	// Maintenance

	{
		path: 'users',
		canActivate: [RolGuard],
		component: UsersPageComponent,
		data: { title: 'Mantenimiento de Usuarios' },
	},
	{ path: 'hospitals', component: HospitalsPageComponent, data: { title: 'Mantenimiento de Hospitales' } },
	{ path: 'doctors', component: MedicosPageComponent, data: { title: 'Mantenimiento de Médicos' } },
	{ path: 'doctor/new', component: MedicoPageComponent, data: { title: 'Mantenimiento de médico | Nuevo' } },
	{
		path: 'doctor/:id',
		component: MedicoPageComponent,
		data: { title: 'Mantenimiento de Médico | Editar', edit: true },
	},
];

const APP_ROUTING = RouterModule.forChild(APP_ROUTES);

@NgModule({
	declarations: [],
	imports: [APP_ROUTING],
	exports: [RouterModule],
})
export class PagesChildRouterModule {}
