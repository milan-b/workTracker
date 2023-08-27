import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { ProductCategory } from './product-category.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private dataService: DataService) { }

  private url = 'product-category';

  getAll(): Observable<ProductCategory[] | null> {
    return this.dataService.getAll<ProductCategory[]>(this.url)
      .pipe(
        map(items => 
          items.body)
      );
  }

  get(id: number):Observable<ProductCategory | null>{
    return this.dataService.getById<ProductCategory>(this.url, '' + id);
  }

  create(productCategory: ProductCategory):Observable<Object>{
    return this.dataService.post(this.url, productCategory);
  }

  update(productCategory: ProductCategory, id: number): Observable<Object>{
    return this.dataService.put(this.url + '/' + id, productCategory);
  }
}
