import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/service/news.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private newsService: NewsService,
    private searchService: SearchService) { }

  subscription: Subscription = new Subscription();

  keyword: string = '';
  news: any;
  page = {
    total: 10,
    currentPage: 1
  }

  pageParams = {
    limit: 10,
    offset: 0
  }

  Inews: News={
    keyword: this.keyword,
    pageParams: this.pageParams,
  }
 
  ngOnInit(): void {
  
      this.getNews(this.Inews);

      this.subscription = this.searchService.currentMessage.subscribe(message =>{
        
          this.Inews.keyword = message.filter;
          this.getNews(this.Inews);
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  pagination(currentPage: any){

    this.page.currentPage = currentPage;
    this.pageParams.offset = this.pageParams.limit * (currentPage - 1);

    this.getNews(this.Inews);
  }
 
  getNews(Inews:News){

   
    this.newsService.getNews(Inews).subscribe(response => {
      this.news = response;
     
      
      this.page.total = response.pagination.total / response.pagination.count;      
    })
  }

}
