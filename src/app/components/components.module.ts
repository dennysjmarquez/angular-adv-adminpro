import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

// Components
import { IncreaseComponent } from './increase/increase.component';
import { ChartsDoughnutComponent } from './charts/charts-doughnut/charts-doughnut.component';
import { ModalChangeImageComponent } from './modal-change-image/modal-change-image.component';

@NgModule({
	declarations: [IncreaseComponent, ChartsDoughnutComponent, ModalChangeImageComponent],
	exports: [IncreaseComponent, ChartsDoughnutComponent, ModalChangeImageComponent],
	imports: [CommonModule, ChartsModule],
})
export class ComponentsModule {}
