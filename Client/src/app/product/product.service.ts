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

  // getAllAsTreeNode(): Observable<TreeNode | undefined>{
  //   return this.getAll().pipe(
  //     map(
  //       productCategories => this.productCategoriesToTreeNode(productCategories)
  //     )
  //   )
  // }

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
      tap(
        () => this.products = null
      )
    );
  }

  update(product: Product, id: number): Observable<Object>{
    return this.dataService.put(this.url + '/' + id, product).pipe(
      tap(
        () => this.products = null
      )
    );
  }

  // private productCategoriesToTreeNode(productCategories :ProductCategory[] | null): TreeNode | undefined{
  //   let result: TreeNode | undefined= undefined;
  //   if (productCategories) {
  //     let root = productCategories.find(i => i.id == 1);
  //     if(root){
  //       result = this.mapProductCategoryToFileNode(root, productCategories);
  //     }
  //   }
  //   return result;
  // }

  // private mapProductCategoryToFileNode(productCategory: ProductCategory, productCategories: ProductCategory[]): TreeNode{
  //   let children = productCategories.filter(i => i.parentId === productCategory.id)
  //   .map((c => this.mapProductCategoryToFileNode(c, productCategories)));
  //   return {
  //     id: productCategory.id!,
  //     name: productCategory.name,
  //     children: children
  //   }
  // }
}
