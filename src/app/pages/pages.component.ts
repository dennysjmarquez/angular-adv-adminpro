import {Component, OnInit} from '@angular/core';

// Services
import {SettingService} from '../services/setting.service';
import {ModalChangeImageService} from '../components/modal-change-image/services/modal-change-image.service';

declare function customScriptINI();

@Component({
   selector: 'app-pages',
   templateUrl: './pages.component.html',
   styles: []
})
export class PagesComponent implements OnInit {

   constructor(
      private _settingService: SettingService,
      private _modalChangeImageService: ModalChangeImageService
   ) {
   }

   ngOnInit(): void {
      customScriptINI();
   }

}
