import {Injectable} from '@angular/core';
import {environment} from '@env';

@Injectable({
   providedIn: 'root',
})
export class SidebarService {
   getMenu(role) {
      if (!role) return [];

      const ROLE_ADMIN = environment.ROLE_ADMIN;

      return [
         {
            title: 'Dashboard',
            iconClass: 'mdi mdi-gauge',
            subMenu: [
               {title: 'Main', path: '/dashboard'},
               {title: 'Progress Bar', path: '/dashboard/progress'},
               {title: 'Graph 1', path: '/dashboard/graph1'},
               {title: 'Promise', path: '/dashboard/promise'},
               {title: 'RxJS', path: '/dashboard/rxjs'},
            ],
         },
         {
            title: 'Mantenimiento',
            iconClass: 'mdi mdi-broom',
            subMenu: [
               ...(role === ROLE_ADMIN ? [{title: 'Usuario', path: 'users'}] : []),
               {title: 'Hospitales', path: 'hospitals'},
               {title: 'Médicos', path: 'doctors'},
            ],
         },
      ];
   }

   constructor() {
   }
}
