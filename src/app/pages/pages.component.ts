import { Component, OnInit } from '@angular/core';

// Services
import {SettingService} from '../services/setting.service';

declare function customScriptINI();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private _settingService: SettingService) { }

  ngOnInit(): void {
    customScriptINI();
  }

}
