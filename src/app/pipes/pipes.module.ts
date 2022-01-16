import { NgModule } from '@angular/core';
import { GetImagePipe } from './get-image.pipe';

@NgModule({
	declarations: [GetImagePipe],
	exports: [GetImagePipe],
})
export class PipesModule {}
