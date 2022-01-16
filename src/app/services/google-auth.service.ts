import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';

import {AuthService} from './auth.service';

declare var gapi: any;

@Injectable({
    providedIn: 'root'
})
export class GoogleAuthService {

    constructor(private _authService: AuthService) {
    }

    makertGoogleLoginBtn(options: {
        // Id del botón de Google en el HTML
        btnSignin: string,
        // Parámetros para el mensaje de Error si algo falla al iniciar la App para el login
        errors?: {
            title?: string,
            text?: string,
            icon?: SweetAlertIcon,
            confirmButtonText?: string
        },
        // Función de se llama luego de un inicio exitoso
        callbackStartApp: Function
    }) {


        // Renderiza el botón de Google
        gapi.signin2.render(options.btnSignin, {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': false,
            'onsuccess': (googleUser) => {},
            'onfailure': console.log
        });


        // Inicia el login con Google
        this._authService.google.startApp('goole-signin').then((profile: any) => {

            options.callbackStartApp(profile);


        }).catch(error => {

            Swal.fire({
                title: options.errors.title || 'Error!',
                text: options.errors.text || error.error.msg,
                icon: options.errors.icon || 'error',
                confirmButtonText: options.errors.confirmButtonText || 'Ok'
            });

        });

    }

}
