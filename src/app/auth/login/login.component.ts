import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
  }

  login(){
    
    this._route.navigateByUrl('/')

  }

}
