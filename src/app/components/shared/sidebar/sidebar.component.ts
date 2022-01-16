import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService } from '../../../services/sidebar.service';
import { UserService } from '../../../pages/maintenance/users/services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/user.model';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [],
})
export class SidebarComponent implements OnInit {
	menuItems: any[];
	user: UserModel = this._userService.user;

	constructor(
		private _sidebarService: SidebarService,
		private _userService: UserService,
		private _authService: AuthService,
		private _router: Router
	) {
		this.menuItems = this._sidebarService.menu;
	}

	ngOnInit(): void {}

	logOut() {
		this._authService.google.logOut(() => this._router.navigateByUrl('/login'));
	}
}
