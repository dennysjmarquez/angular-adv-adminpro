import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../pages/maintenance/users/services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class FileUploadService {
	baseURL = this._authService.baseURL;
	token = this._authService.token;

	constructor(private _authService: AuthService, private http: HttpClient) {}

	upLoad(file: File, type: 'users' | 'medicos' | 'hospitals', uid: String): Observable<any> {
		// Obtiene el Token almacenado localmente
		const token = this.token;

		const formData = new FormData();
		formData.append('image', file);

		return this.http.put(`${this.baseURL}/upload/${type}/${uid}`, formData, {
			headers: { Authorization: token },
		});
	}
}
