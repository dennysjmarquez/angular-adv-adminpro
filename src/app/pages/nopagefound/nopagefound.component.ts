import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [`

    @import "./assets/css/pages/error-pages.css";

  `]
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
