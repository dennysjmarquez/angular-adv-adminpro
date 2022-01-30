import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { GoogleAuthService } from '../../../services/google-auth.service';
import {finalize} from 'rxjs/operators';

declare function customScriptINI();
declare var $: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [
		`
			@import './assets/css/pages/login-register-lock.css';
		`,
	],
})
export class LoginComponent implements OnInit, AfterViewInit {
	public formSubmitted = false;

	public loginFrom = this.fb.group({
		email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		remember: [!!localStorage.getItem('email')],
	});

	constructor(
		private _router: Router,
		private _authService: AuthService,
		private fb: FormBuilder,
		private ngZone: NgZone,
		private googleLoginService: GoogleAuthService
	) {}

	ngOnInit(): void {
		customScriptINI();
	}

	ngAfterViewInit(): void {
		this.googleLoginService.makertGoogleLoginBtn({
			btnSignin: 'goole-signin',

			callbackStartApp: (profile) => {
				if (this.loginFrom.value.remember) {
					localStorage.setItem('email', profile.getEmail());
				} else {
					localStorage.removeItem('email');
				}

				// Redirige
				this.ngZone.run(() => this.redirect());
			},
		});
	}

	fieldNotValid(field: string, error: string): Boolean {
		return (
			this.formSubmitted &&
			(error === 'checkbox' ? !this.loginFrom.get(field).value : this.loginFrom.get(field).getError(error))
		);
	}

	redirect() {
		this._router.navigateByUrl('/');
	}

	onSubmit() {
		this.formSubmitted = true;

		if (this.loginFrom.invalid) {
			return;
		}
		$('.preloader').fadeIn();
		this._authService.loginUser(this.loginFrom.value).pipe(finalize(()=>{
         $(".preloader").fadeOut();
      })).subscribe(
			(resp) => {
				if (this.loginFrom.value.remember) {
					localStorage.setItem('email', this.loginFrom.value.email);
				} else {
					localStorage.removeItem('email');
				}

				this.redirect();
			},
			(error) => {

            Swal.fire({
               title: 'Error!',
               text:error?.error?.msg || 'Error desconocido',
               icon: 'error',
               confirmButtonText: 'Ok'
            });

			}
		)

	}
}
