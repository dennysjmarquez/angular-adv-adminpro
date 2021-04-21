import {Component, NgZone, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UserService} from '../../../services/user.service';
import {GoogleLoginService} from '../../../services/google-login.service';

declare function customScriptINI();

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
        `
            @import "./assets/css/pages/login-register-lock.css";

        `]
})
export class RegisterComponent implements OnInit, AfterViewInit {

    public formSubmitted = false;

    public registerFrom = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        terms: [false, Validators.required]
    }, {
        validators: [
            this.equalFields('password', 'password2', 'passWordNotequal')
        ]
    });

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private _router: Router,
        private ngZone: NgZone,
        private googleLoginService: GoogleLoginService
    ) {
    }

    ngOnInit(): void {

        customScriptINI();

    }

    ngAfterViewInit(): void {

        this.googleLoginService.makertGoogleLoginBtn({

            btnSignin: 'goole-signin',

            callbackStartApp: (profile) => {

                // Redirige
                this.ngZone.run(() => this.redirect());

            }
        });

    }

    fieldNotValid(field: string, error: string): Boolean {

        return this.formSubmitted && (
            error === 'checkbox'
                ? !this.registerFrom.get(field).value
                : this.registerFrom.get(field).getError(error)
        );

    }

    fromNotValid(error: string) {

        return this.registerFrom.getError(error);

    }

    equalFields(FieldName1: string, FieldName2: string, name: string) {

        return (formGroup: FormGroup) => {

            const FieldName1Value = formGroup.get(FieldName1).value;
            const FieldName2Value = formGroup.get(FieldName2).value;

            if (!this.formSubmitted || FieldName1Value === FieldName2Value) {
                return null;
            }

            const error = {};

            error[name] = true;

            return error;


        };

    }

    redirect() {

        this._router.navigateByUrl('/');

    }

    onSubmit() {

        this.formSubmitted = true;

        if (this.registerFrom.invalid) {
            return;
        }

        this.userService.createUser(this.registerFrom.value)
            .subscribe(resp => {

                localStorage.removeItem('email');
                this._router.navigateByUrl('/');

            }, error => {
                //console.log(error.error.msg)

                Swal.fire({
                    title: 'Error!',
                    text: error.error.msg,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })

            })

    }

}
