import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  api_url: string = "https://6193471dd3ae6d0017da846b.mockapi.io/api/3000";

  get(url: string): Observable<HttpResponse<any>> {
    return this.http.get<Array<any>>(
      this.api_url + url, { observe: 'response' })
  }

  post(url: string, body: any): Observable<HttpResponse<any>> {
    return this.http.post(this.api_url + url, body, { observe: 'response' });
  }

  delete(url: string): Observable<HttpResponse<any>> {
    return this.http.delete(this.api_url + url, { observe: 'response' });
  }
}
