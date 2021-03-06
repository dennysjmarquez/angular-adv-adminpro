import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../../../services/user.service';
import {UserModel} from '../../../models/user.model';

declare var gapi: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit {

    user: UserModel = this._userService.user;
    
    constructor(
        private _router: Router,
        private _userService: UserService,
    ) {
    }

    ngOnInit(): void {
    }

    logOut() {

        this._userService.google.logOut(() => this._router.navigateByUrl('/login'));

    }

}
