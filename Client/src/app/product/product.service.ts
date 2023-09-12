import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { Product } from './product.model';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private dataService: DataService) { }

  private url = 'product';

  private products: Product[] | null = null;

  getAll(): Observable<Product[] | null> {
    if(this.products){
      return of(this.products);
    }
    return this.refreshProducts();
  }

  private refreshProducts(): Observable<Product[] | null>{
    return this.dataService.getAll<Product[]>(this.url)
    .pipe(
      map(items =>{
        console.log('products from server : \n', items.body);
        this.products = items.body;
        return this.products;
      })  
    );
  }

  get(id: number):Observable<Product | undefined>{
    return this.getAll().pipe(
      map(
        products => products?.find(product => product.id === id)
      )
    )
  }

  create(product: Product):Observable<Object>{
    return this.dataService.post(this.url, product).pipe(
      tap( () => this.products = null)
    );
  }

  update(product: Product, id: number): Observable<Object>{
    return this.dataService.put(this.url + '/' + id, product).pipe(
      tap( () => this.products = null)
    );
  }

}
