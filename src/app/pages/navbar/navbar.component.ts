import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CatalogService } from "src/app/service/catalog.service";
import { HashTagCategoryService } from "src/app/service/hash-tag-category.service";
import { SearchService } from "src/app/service/search.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  items: any[] = [];
  catalogItems: any[] = [];

  constructor(private hashTagService: HashTagCategoryService,
    private searchService: SearchService,
    private catalogService: CatalogService) {
    this.items = this.hashTagService.hashTags;
    this.catalogItems = this.catalogService.catalogs
  }

  ngOnInit(): void { }

  addNewItem(value: string, id: number) {
    this.searchService.search({ type: 'keywords', filter: value })
     
    this.getCatalog(id)
  }

 


  getCatalog(id: any) {
     
    let catalogElement = this.catalogItems.find(r => r.id === id)
    
    console.log(catalogElement.isActive,catalogElement);

    this.catalogItems.forEach(c => c.isActive = false);
    
    catalogElement.isActive = true;
 
  }
}
