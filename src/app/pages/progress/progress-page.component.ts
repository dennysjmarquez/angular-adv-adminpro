import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-page',
  templateUrl: './progress-page.component.html',
  styles: [`
      
    @import "./assets/css/pages/progressbar-page.css";
  
  `]
})
export class ProgressPageComponent{

  progress1: string = '50%';
  progress2: string = '50%';

  changeValue(value, id){

    if(typeof id === 'undefined' || id === '') return;

    this[id] = `${value}%`

  }

}
