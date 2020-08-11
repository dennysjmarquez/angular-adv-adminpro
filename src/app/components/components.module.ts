import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

// Components
import {IncreaseComponent} from './increase/increase.component';
import { ChartsDoughnutComponent } from './charts/charts-doughnut/charts-doughnut.component';

@NgModule({
  declarations: [
    IncreaseComponent,
    ChartsDoughnutComponent
  ],
  exports: [
    IncreaseComponent,
    ChartsDoughnutComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ]
})
export class ComponentsModule {}
