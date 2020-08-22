import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private _defaultNameTheme = 'default-dark';
  private _linkThemeStyles = document.querySelector('#linkThemeStyles');

  constructor() {

    this.changeTheme(this.getNameTheme());

  }

  changeTheme(nameTheme: string){

    localStorage.setItem('nameTheme', nameTheme);

    const urlThemeStyles = `./assets/css/colors/${nameTheme}.css`;
    this._linkThemeStyles.setAttribute('href', urlThemeStyles);

  }

  getNameTheme(): string {

    return localStorage.getItem('nameTheme') || this._defaultNameTheme;

  }



}
