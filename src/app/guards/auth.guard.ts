import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Services
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private _authService: AuthService, private _Router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this._authService.validateToken().pipe(  
			map(() => {
				return true;
			}),

			catchError((err) => {
				this._Router.navigateByUrl('/login');

				// el " of " permite crar un observable
				// en base a un argumento en este caso false,
				// esto para no romper el siclo del tipo esperado que es
				// un observable
				return of(false);
			})
		);
	}
}
