import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/user.model';
import { UserService } from 'src/app/pages/maintenance/users/services/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [],
})
export class HeaderComponent implements OnInit {
	user: UserModel = this._userService.user;

	constructor(private _router: Router, private _userService: UserService, private _authService: AuthService) {}

	ngOnInit(): void {}

	logOut() {
		this._authService.google.logOut(() => this._router.navigateByUrl('/login'));
	}
}
