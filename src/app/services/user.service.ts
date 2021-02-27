import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterForm} from '../interfaces/register-form.interface';
import {tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoginForm} from '../interfaces/login-form.interface';
import {LoginGoogleData} from '../interfaces/login-google-data.interface';
import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';

declare const gapi: any;

@Injectable({
   providedIn: 'root'
})
export class UserService {

   baseURL = environment.baseUrl;

   public user: UserModel;

   constructor(
      private http: HttpClient,
      private _router: Router,
      private _ngZone: NgZone
   ) {
   }

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
                  client_id: '922862110418-h5ppkfgv8e48qv8igcp6vo8dpio0tjcs.apps.googleusercontent.com',
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
      startApp: (btnSignin: string) => new Promise(async (resolve, reject) => {

         // Se obtiene una sesión de Google
         const auth2Init: any = await this.google.initGoogleAuth();
         const element = document.getElementById(btnSignin);

         // Se captura el evento clic en el botón de Google
         auth2Init.attachClickHandler(element, {}, (googleUser) => {

            const profile = googleUser.getBasicProfile();
            const token = googleUser.getAuthResponse().id_token;

            this.google.login({token}).subscribe(resp => {

               resolve(profile);

            }, error => {

               reject(error);

            });

         }, function(error) {
            alert(JSON.stringify(error, undefined, 2));
         });


      }),


      /**
       *
       * Se intensifica en el servidor de la App
       *
       * @param gToken {string} Token devuelto por Google
       */
      login: (gToken: LoginGoogleData) => {
         return this.http.post(`${this.baseURL}/login/google`, gToken)
            .pipe(
               tap(({token = ''}: any) => {

                  localStorage.setItem('token', token);

               })
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

      }

   };


   /**
    *
    * Obtiene el Token almacenado localmente
    *
    */
   get token(): string{
      return localStorage.getItem('token') || '';
   }


   /**
    *
    */
   validateToken(): Observable<any> {

      // Obtiene el Token almacenado localmente
      const token = this.token;

      // Se chequea primero si el token existe antes de ser enviado al servidor para su validación
      if (!token) {
         return throwError('Usuario no logeado');
      }

      return this.http.get(`${this.baseURL}/login/tokenrenew`,
         {headers: {'Authorization': token}})

         .pipe(
            tap(({token = ''}: any) => {

               // Amacena el nuevo token
               localStorage.setItem('token', token);
            }),
            tap(({usuario}: any) => {

               const {name, email, img, google, role, uid} = usuario;

               this.user = new UserModel(name, email, '', img, google, role, uid);

            }));

   }


   createUser(formData: RegisterForm) {

      return this.http.post(`${this.baseURL}/users`, formData)
         .pipe(
            tap(({token = ''}: any) => {

               localStorage.setItem('token', token);

            })
         );

   }


   updateUserProfile(formData: { name: string; email: string; }): Observable<any> {

      // Obtiene el Token almacenado localmente
      const token = this.token;

      return this.http.put(`${this.baseURL}/users/${this.user.uid}`,
         {
            ...formData,
            role: this.user.role
         },
         {
            headers: {'Authorization': token}
         }
      ).pipe(
         tap(({userUpdate}: any) => {

            const {name, email, img, google, role, uid} = userUpdate;
            this.user = new UserModel(name, email, '', img, google, role, uid);

         })
      );

   }

   loginUser(formData: LoginForm): Observable<any> {

      return this.http.post(`${this.baseURL}/login`, formData)
         .pipe(
            tap(({token = ''}: any) => {

               localStorage.setItem('token', token);

            })
         );


   }


}
