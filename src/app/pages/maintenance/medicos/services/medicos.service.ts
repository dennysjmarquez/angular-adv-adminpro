import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { AuthService } from '../../../../services/auth.service';
import { SearchService } from '../../../../services/search.service';
import { MedicosModel } from '../../../../models/medicos.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MedicosService {
	baseURL = environment.baseUrl;

	constructor(private http: HttpClient, private _authService: AuthService, private _searchService: SearchService) {}

	/**
	 *
	 * Obtiene la lista de Medicos
	 *
	 * @param offset {number}
	 */
	getMedicos(offset: number | null) {
		return this.http
			.get<MedicosModel[]>(`${this.baseURL}/medicos${offset === null ? '' : `?offset=${offset}`}`, {
				headers: { Authorization: this._authService.token },
			})
			.pipe(delay(300));
	}

	/**
	 *
	 * Obtiene los medicos nediante un término de búsqueda
	 * y muestra los datos a partir de un offset para la paginación
	 *
	 * @param search {string}
	 * @param offset {number}
	 */
	searchMedicos(search: String, offset: number) {
		return this._searchService.searchs(
			this._authService.token,
			`${this.baseURL}/search/medico?q=${encodeURIComponent(String(search))}&offset=${offset}`
		);
	}

	updateMedico(uid: string, name: string, hospitalId: string): Observable<any> {
		return this.http.put(
			`${this.baseURL}/medicos/${uid}`,
			{ name, hospital: hospitalId },
			{ headers: { Authorization: this._authService.token } }
		);
	}

	deleteMedico(uid: string) {
		return this.http.delete(`${this.baseURL}/medicos/${uid}`, {
			headers: { Authorization: this._authService.token },
		});
	}

	createMedico(formData: { name: string; hospital: string; img: string | null }) {
		return this.http.post(`${this.baseURL}/medicos`, formData, {
			headers: { Authorization: this._authService.token },
		});
	}
}
