import {Component, OnInit} from '@angular/core';

// Services
import {SidebarService} from '../../services/sidebar.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit {

    menuItems: any[];

    constructor(
        private _sidebarService: SidebarService,
        private _userService: UserService,
        private _router: Router
        ) {

        this.menuItems = this._sidebarService.menu;

    }

    ngOnInit(): void {
    }

    logOut(){

        this._userService.google.logOut(()=>this._router.navigateByUrl('/login'));

    }

}
