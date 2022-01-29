import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '@env';
import {UserModel} from '../models/user.model';
import {HospitalsModel} from '../models/hospitals.model';
import {MedicosModel} from '../models/medicos.model';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	baseURL = environment.baseUrl;

	constructor(private http: HttpClient, private _authService: AuthService) {}

	/**
	 *
	 * Hace una busqueda segun un término
	 *
	 * @param url {string} URL para la consulta
	 */
	searchs(url: string) {
		return this.http
			.get(url, {
				headers: { Authorization: this._authService.token },
			})
			.pipe(delay(200));
	}

	searchsAll(q: string) {
		return this.http.get<SearchesResults>(`${this.baseURL}/search/?q=${encodeURIComponent(String(q))}`, {
			headers: { Authorization: this._authService.token },
		});
	}
}

export interface SearchesResults {
   users: UserModel[];
   hospitals: HospitalsModel[];
   medicos: MedicosModel[];
}
