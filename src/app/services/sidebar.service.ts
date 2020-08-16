import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      iconClass: 'mdi mdi-gauge',
      subMenu: [
        {
          title: 'Main',
          path: '/'
        },        {
          title: 'Progress Bar',
          path: '/dashboard/progress'
        },        {
          title: 'Graph 1',
          path: '/dashboard/graph1'
        }
      ]
    }
  ]

  constructor() { }
}
