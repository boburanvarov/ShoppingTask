import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private apiService: ApiService) { }

  getNews(news:News): Observable<any> {

    let data = {
      sources: 'cnn,bbc',
      // categories: 'sports',
      // countries: 'us',
      // languages: 'ru',
      keywords : news.keyword,
      limit: news.pageParams.limit,
      offset: news.pageParams.offset
    }
    let params = this.buildQueryParams(data);

    return this.apiService.get(params);
  }

  
  buildQueryParams(data: any){
    let params = new URLSearchParams();
    for(let key in data){
        params.set(key, data[key]) 
    }

    return '&' + params.toString();
  }
}
