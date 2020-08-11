import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-increase',
  templateUrl: './increase.component.html',
  styles: [
  ]
})
export class IncreaseComponent implements OnInit{

  progress: number = 0

  @Output() change = new EventEmitter<number>()
  @Input() valueInit: string = '0'
  @Input() variant: string = ''
  @Input() unitText: string = '%'

  ngOnInit(){

    this.progress = parseInt(this.valueInit.replace( /^\D+/g, ''));

  }
  get progressLevel(){
    return `${this.progress}${this.unitText}`
  }

  changeValue(value: number){

    this.progress += value;

    this.progress < 0 && (this.progress = 0);
    this.progress > 100 && (this.progress = 100);

    this.change.emit(this.progress);

  }

}
