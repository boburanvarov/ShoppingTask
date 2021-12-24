import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];

  constructor(private apiService: ApiService) { }
  
  ngOnInit() {
    this.getCategories();
    this.getProducts(1);
  }

  getCategories(){
    this.apiService.get('/category').subscribe(resp => {
      this.categories = resp.body;
      console.log(this.categories);
    })
  }

  getProducts(categoryId: number){
    this.apiService.get('/category/' + categoryId + '/product').subscribe(resp => {
      this.products = resp.body;
      console.log(this.products);
    })
  }

  deleteProduct(product: Product){
    this.apiService.delete('/category/' + product.categoryId + '/product/' + product.id).subscribe(resp => {
      
      console.log(resp.body);

      this.getProducts(product.categoryId);
    })
  }

}
