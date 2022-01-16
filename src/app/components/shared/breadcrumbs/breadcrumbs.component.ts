import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
	Title = '';
	private _outerData$: Subscription;

	constructor(private _router: Router) {
		this.getRouterData();
	}

	get lowerTitle() {
		return this.Title.toLowerCase();
	}

	getRouterData() {
		// Extrae los parámetros pasados en las rutas del Router
		this._outerData$ = this._router.events
			.pipe(
				// Solo filtra que sean ActivationEnd
				filter((event) => event instanceof ActivationEnd),

				// Ahora filtra que no sea un Router hijo, determinando que el firstChild sea null
				filter((event: ActivationEnd) => event.snapshot.firstChild === null),

				// Devuelve nada mas la data que es lo que nos interesa
				// y es donde estan los parametros en un router hujo
				// seria ejemplo: event.snapshot.firstChild.data
				map((event: ActivationEnd) => event.snapshot.data)
			)
			.subscribe((data) => {
				this.Title = data.title || 'AdminPro';
				document.title = `AdminPro - ${this.Title}`;
			});
	}

	ngOnDestroy(): void {
		this._outerData$.unsubscribe();
	}
}
