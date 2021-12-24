import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor() { }

  catalogs=[
    { 
      id:1,
      name:"sports",
      isActive:false
    },
    {
      id:2,
      name:"technology",
      isActive:false
    }
  ]
}
