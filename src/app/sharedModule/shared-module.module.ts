import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Pipes
import {GetImagePipe} from '../pipes/get-image.pipe';

@NgModule({
   declarations: [GetImagePipe],
   imports: [
      CommonModule
   ],
   exports: [GetImagePipe]
})
export class SharedModuleModule {
}
