import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // TODO add error interceptor - https://satyapriyamishra111.medium.com/angular-error-interceptor-4b102f938065

  constructor(private http: HttpClient) { }

  /**
    * Perform http get without params. If you need params use function get
    *
    * @param {string} url    URL
    */
  getAll<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(environment.apiUrl + url, { observe: 'response' });
  }


  /**
     * Perform http get 
     *
     * @param {string} url    URL
     * @param {HttpParams} params Get-params
     */
  get<T>(url: string, params: HttpParams): Observable<HttpResponse<T>> {
    return this.http.get<T>(environment.apiUrl + url, { observe: 'response', params: params });
  }

  getChildren<T>(url: string, id: string | number): Observable<HttpResponse<T>> {
    return this.http.get<T>(environment.apiUrl + url + '/' + id, { observe: 'response' });
  }

  /**
     * Perform http get 
     *
     * @param {string} url    URL
     * @param {string} id 
     */
  getById<T>(url: string, id: string): Observable<T> {
    return this.http.get<T>(environment.apiUrl + url + '/' + id);
  }

  post(url: string, data: any): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.apiUrl + url, data, httpOptions);
  }

  put(url: string, data: any): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.apiUrl + this.addVerbBeforeId('put', url), data, httpOptions);
  }

  putNoData(url: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.apiUrl + this.addVerbBeforeId('put', url), null, httpOptions);
  }

  delete(url: string): Observable<Object> {
    return this.http.post(environment.apiUrl + this.addVerbBeforeId('delete', url), {});
  }

  private addVerbBeforeId(verb: string, url: string): string{
    let path = url.split('/');
    return path.length > 1 ?
      path[0] + '/' + verb + '/' + path[1] :
      path[0] + '/' + verb;
  }
}
