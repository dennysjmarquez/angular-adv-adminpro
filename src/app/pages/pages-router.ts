import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardPageComponent} from './dashboard/dashboard-page.component';
import {ProgressPageComponent} from './progress/progress-page.component';
import {Grafica1PageComponent} from './grafica1/grafica1-page.component';
import {AcountSettingPageComponent} from './acount-setting/acount-setting-page.component';
import {PromisePageComponent} from './promise/promise-page.component';
import {RxjsPageComponent} from './rxjs/rxjs-page.component';
import {ProfilePageComponent} from './profile/profile-page.component';

// Guards
import {AuthGuard} from '../guards/auth.guard';
import {UsersPageComponent} from './maintenance/users/users-page.component';
import {DoctorsPageComponent} from './maintenance/doctors/doctors-page.component';
import {HospitalsPageComponent} from './maintenance/hospitals/hospitals-page.component';


const APP_ROUTES: Routes = [
   // Template principal
   {
      path: 'dashboard', component: PagesComponent, canActivate: [AuthGuard],
      children: [
         {path: '', component: DashboardPageComponent, data: {title: 'Dashboard'}},
         {path: 'progress', component: ProgressPageComponent, data: {title: 'Progress Bar'}},
         {path: 'graph1', component: Grafica1PageComponent, data: {title: 'Graph1'}},
         {path: 'promise', component: PromisePageComponent, data: {title: 'Promise'}},
         {path: 'rxjs', component: RxjsPageComponent, data: {title: 'RxJs'}},
         {path: 'acount-setting', component: AcountSettingPageComponent, data: {title: 'Acount Setting'}},
         {path: 'profile', component: ProfilePageComponent, data: {title: 'Profile'}},

         // Maintenance

         {path: 'users', component: UsersPageComponent, data: {title: 'Usuarios'}},
         {path: 'hospitals', component: HospitalsPageComponent, data: {title: 'Hospitales'}},
         {path: 'doctors', component: DoctorsPageComponent, data: {title: 'Médicos'}}


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
export class PagesRouter {
}





