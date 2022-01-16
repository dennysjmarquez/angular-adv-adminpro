import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../components/shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// Components Pages
import { DashboardPageComponent } from './dashboard/dashboard-page.component';
import { Grafica1PageComponent } from './grafica1/grafica1-page.component';
import { ProgressPageComponent } from './progress/progress-page.component';
import { PagesComponent } from './pages.component';
import { AcountSettingPageComponent } from './acount-setting/acount-setting-page.component';
import { PromisePageComponent } from './promise/promise-page.component';
import { RxjsPageComponent } from './rxjs/rxjs-page.component';
import { ProfilePageComponent } from './profile/profile-page.component';
import { UsersPageComponent } from './maintenance/users/users-page.component';
import { HospitalsPageComponent } from './maintenance/hospitals/hospitals-page.component';
import { MedicosPageComponent } from './maintenance/medicos/medicos-page.component';
import { LoadingComponent } from './maintenance/components/loading/loading.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicoPageComponent } from './maintenance/medicos/medico/medico-page.component';

@NgModule({
	declarations: [
		DashboardPageComponent,
		Grafica1PageComponent,
		ProgressPageComponent,
		PagesComponent,
		AcountSettingPageComponent,
		PromisePageComponent,
		RxjsPageComponent,
		ProfilePageComponent,
		UsersPageComponent,
		HospitalsPageComponent,
		MedicosPageComponent,
		LoadingComponent,
		MedicoPageComponent,
	],
	imports: [
		// RouterModule lo importamos porque se necesita las rutas  <router-outlet></router-outlet>
		// el modulo de las rutas se importa en app.modules y de esta forma imortando RouterModule las
		// reutilizamos de otra forma tendriamos que importarlas con un
		// import {AppRoutersModule} from './routers/app-routers.module';
		RouterModule,

		CommonModule,
		ComponentsModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		PipesModule,
	],
	exports: [
		DashboardPageComponent,
		Grafica1PageComponent,
		ProgressPageComponent,
		PagesComponent,
		AcountSettingPageComponent,
	],
})
export class PagesModule {}
