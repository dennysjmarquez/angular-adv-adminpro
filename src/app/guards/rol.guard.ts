import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {environment} from '@env';

@Injectable({
   providedIn: 'root',
})
export class RolGuard implements CanActivate {
   public ROLE_ADMIN: string = environment.ROLE_ADMIN;

   constructor(private _authService: AuthService) {
   }

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this._authService.currentUser.role === this.ROLE_ADMIN;
   }
}
