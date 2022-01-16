import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class MedicoService {
	baseURL = environment.baseUrl;

	constructor(private http: HttpClient, private _authService: AuthService) {}

	/**
	 *
	 * Obtiene un Medico por su id
	 *
	 * @param uid id del medico
	 */
	getMedico(uid: string) {
		return this.http.get(`${this.baseURL}/medicos/${uid}`, {
			headers: { Authorization: this._authService.token },
		});
	}
}
