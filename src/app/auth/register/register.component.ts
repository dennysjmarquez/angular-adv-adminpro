import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
import {UserService} from '../../services/user.service';

declare function customScriptINI();

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
            `
            @import "./assets/css/pages/login-register-lock.css";

        `]
})
export class RegisterComponent implements OnInit {

    public formSubmitted = false;

    public registerFrom = this.fb.group({
        name: ['Dennys', [Validators.required, Validators.minLength(3)]],
        email: ['dennysjmarquez@gmail.com', [Validators.required, Validators.email]],
        password: ['123456', Validators.required],
        password2: ['123456', Validators.required],
        terms: [false, Validators.required]
    },{
        validators: [
            this.equalFields('password','password2', 'passWordNotequal')
        ]
    });

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {

        customScriptINI();

    }

    fieldNotValid(field: string, error: string): Boolean{

        return this.formSubmitted && (
            error === 'checkbox'
                ? !this.registerFrom.get(field).value
                : this.registerFrom.get(field).getError(error)
        )

    }

    fromNotValid(error: string){

      return this.registerFrom.getError(error)

    }

    equalFields(FieldName1: string, FieldName2: string, name: string){

        return (formGroup: FormGroup) => {

            const FieldName1Value = formGroup.get(FieldName1).value;
            const FieldName2Value = formGroup.get(FieldName2).value;

            if(!this.formSubmitted || FieldName1Value === FieldName2Value) return null;

            const error = {};

            error[name] = true;

            return error;


        }

    }

    onSubmit() {

        this.formSubmitted = true;

        console.log(this.registerFrom);

        if(this.registerFrom.invalid) return;

        console.log('onSubmit');

        this.userService.createUser(this.registerFrom.value)
            .subscribe( resp =>{

                console.log('createUser');

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
