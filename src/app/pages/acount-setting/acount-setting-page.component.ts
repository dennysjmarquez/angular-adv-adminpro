import {Component, OnInit} from '@angular/core';

// Services
import {SettingService} from '../../services/setting.service';


@Component({
  selector: 'app-acount-setting-page',
  templateUrl: './acount-setting-page.component.html',
  styles: [
    `
      #themecolors > li > a.selector {
          cursor: pointer;
      }
    
    `]
})
export class AcountSettingPageComponent implements OnInit {

  constructor(
    private _settingService: SettingService
  ) {}

  ngOnInit(): void {

    this.setCurrentTheme();

  }

  setCurrentTheme(){

     const boxTheme = document.querySelector(`.selector[data-theme="${this._settingService.getNameTheme()}"]`),
      currentBoxTheme = document.querySelector('.selector.working');

    currentBoxTheme && currentBoxTheme.classList.remove('working')
    boxTheme && boxTheme.classList.add('working')

  }

  changeTheme(nameTheme: string){

    this._settingService.changeTheme(nameTheme);
    this.setCurrentTheme();

  }

}
