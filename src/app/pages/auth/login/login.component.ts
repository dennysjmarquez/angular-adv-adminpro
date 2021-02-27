import {Component, OnInit, AfterViewInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {UserService} from '../../../services/user.service';
import {GoogleLoginService} from '../../../services/google-login.service';

declare function customScriptINI();

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styles: [
      `
         @import "./assets/css/pages/login-register-lock.css";

      `]
})
export class LoginComponent implements OnInit, AfterViewInit {

   public formSubmitted = false;

   public loginFrom = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [!!localStorage.getItem('email')]
   });

   constructor(
      private _router: Router,
      private fb: FormBuilder,
      private userService: UserService,
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

            if (this.loginFrom.value.remember) {

               localStorage.setItem('email', profile.getEmail());

            } else {

               localStorage.removeItem('email');

            }

            // Redirige
            this.ngZone.run(() => this.redirect());

         }
      });

   }

   fieldNotValid(field: string, error: string): Boolean {

      return this.formSubmitted && (
         error === 'checkbox'
            ? !this.loginFrom.get(field).value
            : this.loginFrom.get(field).getError(error)
      );

   }

   redirect() {

      this._router.navigateByUrl('/');

   }

   onSubmit() {

      this.formSubmitted = true;

      console.log(this.loginFrom);

      if (this.loginFrom.invalid) {
         return;
      }

      console.log('onSubmit');

      this.userService.loginUser(this.loginFrom.value).subscribe(resp => {

         console.log('onSubmit loginUser', resp);

         if (this.loginFrom.value.remember) {

            localStorage.setItem('email', this.loginFrom.value.email);

         } else {

            localStorage.removeItem('email');

         }

         this.redirect();

      }, error => {

         Swal.fire({
            title: 'Error!',
            text: error.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
         });

      });

   }


}
