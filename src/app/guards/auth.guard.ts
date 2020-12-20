import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Router} from '@angular/router';

// Services
import {UserService} from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private _UserService: UserService, private _Router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this._UserService.validateToken().pipe(map(() => {
                return true;
            }),

            catchError((err) => {

                this._Router.navigateByUrl('/login');

                // el " of " permite crar un observable
                // en base a un argumento en este caso false,
                // esto para no romper el siclo lo tipo esperado
                return of(false);

            })
        );

    }

}
