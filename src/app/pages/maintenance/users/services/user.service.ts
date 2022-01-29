import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../../../../interfaces/register-form.interface';
import { delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { UserModel } from '../../../../models/user.model';
import { SearchService } from '../../../../services/search.service';
import { AuthService } from '../../../../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	baseURL = environment.baseUrl;

	constructor(private http: HttpClient, private _searchService: SearchService, private _authService: AuthService) {}

	updateUserProfile(formData: { name: string; email: string }): Observable<any> {
		const { role, uid } = this._authService.currentUser;

		return this.http.put(
			`${this.baseURL}/users/${uid}`,
			{ ...formData, role },
			{ headers: { Authorization: this._authService.token } }
		);
	}

	updateUser(formData: UserModel): Observable<any> {
		return this.http.put(
			`${this.baseURL}/users/${formData.uid}`,
			{ ...formData },
			{ headers: { Authorization: this._authService.token } }
		);
	}

	createUser(formData: RegisterForm) {
		return this.http.post(`${this.baseURL}/users`, formData).pipe(
			tap(({ token = '' }: any) => {
				localStorage.setItem('token', token);
			})
		);
	}

	/**
	 *
	 * Obtiene los usuarios desde un numero dado
	 *
	 * @param offset {number}
	 */
	getUsers(offset: number | null) {
		return this.http
			.get(`${this.baseURL}/users${offset === null ? '' : `?offset=${offset}`}`, {
				headers: { Authorization: this._authService.token },
			})
			.pipe(delay(300));
	}

	/**
	 *
	 * Obtiene los usuarios nediante un término de búsqueda
	 * y muestra los datos a partir de un offset para la paginación
	 *
	 * @param search {string}
	 * @param offset {number}
	 */
	searchUsers(search: String, offset: number) {
		return this._searchService.searchs(
			`${this.baseURL}/search/user?q=${encodeURIComponent(String(search))}&offset=${offset}`
		);
	}

	deleteUser(uid: string) {
		return this.http.delete(`${this.baseURL}/users/${uid}`, {
			headers: { Authorization: this._authService.token },
		});
	}
}
