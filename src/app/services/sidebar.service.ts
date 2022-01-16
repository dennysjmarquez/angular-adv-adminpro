import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class SidebarService {
	menu: any[] = [
		{
			title: 'Dashboard',
			iconClass: 'mdi mdi-gauge',
			subMenu: [
				{ title: 'Main', path: '/dashboard' },
				{ title: 'Progress Bar', path: '/dashboard/progress' },
				{ title: 'Graph 1', path: '/dashboard/graph1' },
				{ title: 'Promise', path: '/dashboard/promise' },
				{ title: 'RxJS', path: '/dashboard/rxjs' },
			],
		},
		{
			title: 'Mantenimiento',
			iconClass: 'mdi mdi-broom',
			subMenu: [
				{ title: 'Usuario', path: 'users' },
				{ title: 'Hospitales', path: 'hospitals' },
				{ title: 'Médicos', path: 'doctors' },
			],
		},
	];

	constructor() {}
}
