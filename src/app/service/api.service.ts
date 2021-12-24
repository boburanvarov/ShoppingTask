import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(params: string = ''): Observable<any> {
    
    console.log("[GET]:", environment.apiUrl + '?access_key=' + environment.accessKey + params);
    
    return this.http.get(environment.apiUrl + '?access_key=' + environment.accessKey + params);
  }
}
