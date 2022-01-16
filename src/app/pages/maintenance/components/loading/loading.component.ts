import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styles: [],
})
export class LoadingComponent implements OnInit {
	constructor() {}

   @Input('loading') loading

	ngOnInit(): void {}
}
