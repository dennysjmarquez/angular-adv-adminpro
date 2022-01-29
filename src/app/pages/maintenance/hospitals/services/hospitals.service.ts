import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { HospitalsModel } from '../../../../models/hospitals.model';
import { AuthService } from '../../../../services/auth.service';
import { SearchService } from '../../../../services/search.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HospitalsService {
	baseURL = environment.baseUrl;

	constructor(private http: HttpClient, private _authService: AuthService, private _searchService: SearchService) {}

	updateHospital(uid: string, name: string): Observable<Object> {
		return this.http.put(
			`${this.baseURL}/hospitals/${uid}`,
			{ name },
			{ headers: { Authorization: this._authService.token } }
		);
	}

	createHospital(formData: HospitalsModel) {
		return this.http.post(`${this.baseURL}/hospitals`, formData, {
			headers: { Authorization: this._authService.token },
		});
	}

	/**
	 *
	 * Obtiene la lista de hospitales
	 *
	 * @param offset {number}
	 */
	getHospitals(offset: number | null): Observable<HospitalsModel[]> {
		return this.http
			.get<HospitalsModel[]>(`${this.baseURL}/hospitals${offset === null ? '' : `?offset=${offset}`}`, {
				headers: { Authorization: this._authService.token },
			})
			.pipe(delay(300));
	}

	/**
	 *
	 * Obtiene los hospitales nediante un término de búsqueda
	 * y muestra los datos a partir de un offset para la paginación
	 *
	 * @param search {string}
	 * @param offset {number}
	 */
	searchHospitals(search: String, offset: number) {
		return this._searchService.searchs(
			`${this.baseURL}/search/hospital?q=${encodeURIComponent(String(search))}&offset=${offset}`
		);
	}

	deleteHospital(uid: string) {
		return this.http.delete(`${this.baseURL}/hospitals/${uid}`, {
			headers: { Authorization: this._authService.token },
		});
	}
}
