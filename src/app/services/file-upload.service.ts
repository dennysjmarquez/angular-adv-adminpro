import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UserService} from './user.service';
import {Observable} from 'rxjs';


@Injectable({
   providedIn: 'root'
})
export class FileUploadService {

   baseURL = this._userService.baseURL;
   token = this._userService.token;

   constructor(private _userService: UserService, private http: HttpClient) {
   }

   upLoad(
      file: File,
      type: 'users' | 'medicos' | 'hospitals',
      uid: String
   ): Observable<any> {

      // Obtiene el Token almacenado localmente
      const token = this.token;

      const formData = new FormData();
      formData.append('image', file);

      return this.http.put(`${this.baseURL}/upload/${type}/${uid}`,
         formData,
         {
            headers: {'Authorization': token}
         }
      );

   }

}
