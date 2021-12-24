import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashTagCategoryService {

  constructor() { }

    hashTags=[
      { 
        id:1,
        name:"football"
      },
      {
        id:2,
        name:"samsung"
      },
      {
        id:1,
        name:"tennis"
      },
      {
        id:2,
        name:"huawei"
      },
      {
        id:2,
        name:"apple"
      },     
      {
        id:2,
        name:"samsung"
      },
    ]
}
