import { Injectable } from '@angular/core';
import { DataService, TreeNode } from '../shared';
import { ProductCategory } from './product-category.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private dataService: DataService) { }

  private url = 'product-category';

  getAll(): Observable<TreeNode | undefined> {
    return this.dataService.getAll<ProductCategory[]>(this.url)
      .pipe(
        map(items => this.productCategoriesToTreeNode(items.body))   
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

  private productCategoriesToTreeNode(productCategories :ProductCategory[] | null): TreeNode | undefined{
    let result: TreeNode | undefined= undefined;
    if (productCategories) {
      let root = productCategories.find(i => i.id == 1);
      if(root){
        result = this.mapProductCategoryToFileNode(root, productCategories);
      }
    }
    return result;
  }

  private mapProductCategoryToFileNode(productCategory: ProductCategory, productCategories: ProductCategory[]): TreeNode{
    let children = productCategories.filter(i => i.parentId === productCategory.id)
    .map((c => this.mapProductCategoryToFileNode(c, productCategories)));
    return {
      id: productCategory.id!,
      name: productCategory.name,
      children: children
    }
  }


}
