import { Component, OnInit } from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {

    customScriptINI();

  }

}
