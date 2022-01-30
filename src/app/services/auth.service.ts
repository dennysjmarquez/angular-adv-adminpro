import { Injectable, NgZone } from '@angular/core';
import { LoginGoogleData } from '../interfaces/login-google-data.interface';
import { tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env';
import { LoginForm } from '../interfaces/login-form.interface';

declare var gapi: any;
declare var $: any;

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	baseURL = environment.baseUrl;
   google_id = environment.GOOGLE_ID

	public currentUser: UserModel;

	constructor(private http: HttpClient, private _router: Router, private _ngZone: NgZone) {}

	google = {
		/**
		 *
		 * Obtiene una sesión de Google
		 *
		 */
		initGoogleAuth: () => {
			return new Promise((resolve) => {
				gapi.load('auth2', () => {
					this.google.startApp['gapiAuth2'] = gapi.auth2;

					// Retrieve the singleton for the GoogleAuth library and set up the client.
					const auth2Init = gapi.auth2.init({
						client_id: this.google_id,
						cookiepolicy: 'single_host_origin',
						// Request scopes in addition to 'profile' and 'email'
						//scope: 'additional_scope'
					});

					resolve(auth2Init);
				});
			});
		},

		/**
		 *
		 * Obtiene una sesión de Google y se coloca el escucha del evento de clic sobre el botón de Google
		 *
		 * @param btnSignin {string} Id del botón de Google en el HTML
		 */
		startApp: (btnSignin: string) =>
			new Promise(async (resolve, reject) => {
				// Se obtiene una sesión de Google
				const auth2Init: any = await this.google.initGoogleAuth();
				const element = document.getElementById(btnSignin);

				// Se captura el evento clic en el botón de Google
				auth2Init.attachClickHandler(
					element,
					{},
					(googleUser) => {
						const profile = googleUser.getBasicProfile();
						const token = googleUser.getAuthResponse().id_token;
                  $(".preloader").fadeIn();
						this.google.login({ token }).subscribe(
							(resp) => {
								resolve(profile);
							},
							(error) => {
                        $(".preloader").fadeOut();
								reject(error);
							}
						);
					},
					function (error) {
						alert(JSON.stringify(error, undefined, 2));
					}
				);
			}),

		/**
		 *
		 * Se intensifica en el servidor de la App
		 *
		 * @param gToken {string} Token devuelto por Google
		 */
		login: (gToken: LoginGoogleData) => {
			return this.http.post(`${this.baseURL}/login/google`, gToken).pipe(
				tap(({ token = '' }: any) => {
					localStorage.setItem('token', token);
				}),
				tap((data: any) => this.setCurrentUser(data))
			);
		},

		/**
		 *
		 * Lleva acabo el  logOut  de la App
		 *
		 * @param callback {Function} Función anónima que es llamada luego que se haya hecho el logOut
		 */
		logOut: (callback?: Function) => {
			const logOut = () => {
				this.resetCurrentUser();
				const auth2 = this.google.startApp['gapiAuth2'].getAuthInstance();

				auth2.signOut().then(() => {
					localStorage.removeItem('token');

					typeof callback === 'function' && this._ngZone.run(() => callback());
				});
			};

			// Por si se pierde la sesión porque se refresca la pagina
			if (!this.google.startApp['gapiAuth2']) {
				this.google.initGoogleAuth().then(() => logOut());
			} else {
				logOut();
			}
		},
	};

	/**
	 *
	 * Obtiene el Token y lo almacena localmente
	 *
	 */
	get token(): string {
		return localStorage.getItem('token') || '';
	}

	/**
	 *
	 * Valida el token este método se usa en auth.guard para conceder el acceso o deniegarlo
	 * en ciertas zonas o paginas también almacena información sensible del usuario
	 * en este servicio, tales como: name, email, img, google, role, uid
	 *
	 * En la prop public user: UserModel de la class
	 *
	 */
	validateToken(): Observable<any> {
		// Obtiene el Token almacenado localmente
		const token = this.token;

		// Se chequea primero si el token existe antes de ser enviado al servidor para su validación
		if (!token) {
			return throwError('Usuario no logeado');
		}

		return this.http
			.get(`${this.baseURL}/login/tokenrenew`, { headers: { Authorization: token } })

			.pipe(
				tap(({ token = '' }: any) => {
					// Almacena el nuevo token
					localStorage.setItem('token', token);
				}),
				tap((data: any) => this.setCurrentUser(data))
			);
	}

	loginUser(formData: LoginForm): Observable<any> {
		return this.http.post(`${this.baseURL}/login`, formData).pipe(
			tap(({ token = '' }: any) => {
				localStorage.setItem('token', token);
			}),
			tap((data: any) => this.setCurrentUser(data))
		);
	}

	private resetCurrentUser() {
		this.currentUser = new UserModel(null, null, null, null, null, null, null);
	}

	private setCurrentUser({ usuario: { name, email, img, google, role, uid } }) {
		this.currentUser = new UserModel(name, email, '', img, google, role, uid);
	}
}
