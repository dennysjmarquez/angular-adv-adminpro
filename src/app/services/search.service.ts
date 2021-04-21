import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class SearchService {

   constructor(private http: HttpClient) {
   }

   /**
    *
    * Hace una busqueda segun un término
    *
    * @param token {string} Authorization Token
    * @param url {string} URL para la consulta
    */
   searchs(token: string, url: string) {

      return this.http.get(url, {
         headers: {'Authorization': token}
      }).pipe(delay(200));

   }

}
