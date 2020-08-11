import { Component, Input } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-charts-doughnut',
  templateUrl: './charts-doughnut.component.html',
  styles: []
})
export class ChartsDoughnutComponent {

  @Input() title: string = ''
  @Input() labels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() data: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  @Input() options: ChartOptions = {};
  @Input() colors: Color[] = [];

}
