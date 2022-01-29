import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchesResults, SearchService } from '../../services/search.service';

@Component({
	selector: 'app-searches',
	templateUrl: './searches.component.html',
	styles: [],
})
export class SearchesComponent implements OnInit {
	public loading: boolean = false;

   public results: SearchesResults = {
		users: [],
		hospitals: [],
		medicos: [],
	};
	public searchText: string;

	constructor(private _activeRouter: ActivatedRoute, private _router: Router, private _searchService: SearchService) {}

	ngOnInit(): void {
		this._activeRouter.params.subscribe(({ q }) => this.search(q));
	}

	search(q) {
		if (!q) {
			return this._router.navigateByUrl('/404');
		}

		this.loading = true;
		this.searchText = q;
		this._searchService.searchsAll(q).subscribe(
			(response: any) => {
				const { results } = response;
				this.results = results;
			},
			(error) => {
				console.log(error);
			},
			() => {
				// Oculta el loading
				this.loading = false;
			}
		);
	}
}
