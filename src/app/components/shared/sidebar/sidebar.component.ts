import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService } from '../../../services/sidebar.service';
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
	user: UserModel = this._authService.currentUser;

	constructor(private _sidebarService: SidebarService, private _authService: AuthService, private _router: Router) {
		const {
			currentUser: { role },
		} = _authService;

		this.menuItems = this._sidebarService.getMenu(role);
	}

	ngOnInit(): void {}

	logOut() {
		this._authService.google.logOut(() => this._router.navigateByUrl('/login'));
	}
}
