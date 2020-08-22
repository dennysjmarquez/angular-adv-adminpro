import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare function customScriptINI();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
          @import "./assets/css/pages/login-register-lock.css";

    `]
})
export class LoginComponent implements OnInit {

  constructor(private _route: Router) { }

  ngOnInit(): void {

    customScriptINI();

  }

  login(){

    this._route.navigateByUrl('/')

  }

}
