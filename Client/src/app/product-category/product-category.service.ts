import { Injectable } from '@angular/core';
import { DataService, TreeNode } from '../shared';
import { ProductCategory } from './product-category.model';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private dataService: DataService) { }

  private url = 'product-category';

  private productCategories: Map<number, ProductCategory> | null = null;

  private productCategoryTree: TreeNode | undefined;

  getAll(): Observable<Map<number, ProductCategory> | null> {
    if(this.productCategories){
      return of(this.productCategories);
    }
    return this.refreshProductCategories();
  }

  // getAllSubcategories(productCategory: ProductCategory): Observable<TreeNode[]>{
  //   return this.getAllAsTreeNode().pipe(
  //     map(
  //       productCategoriesTree => {
  //         let parentCategoryNode: TreeNode | undefined;
  //         let nodesToSearch = [productCategoriesTree];

  //         do{
  //           parentCategoryNode = nodesToSearch.find(node => node?.id === productCategory.id);
  //           let newNodesToSearch: TreeNode[] = [];
  //           nodesToSearch.forEach(node =>{
  //             if(node?.children){
  //               newNodesToSearch.push(...node.children);
  //             }
  //           });
  //           nodesToSearch = newNodesToSearch;
  //         }while(!parentCategoryNode);

  //         let result: TreeNode[] = [parentCategoryNode];
  //         let nodesToExpand: TreeNode[] = [parentCategoryNode];

  //         while(nodesToExpand.length > 0){
  //           let newNodesToExpand: TreeNode[] = [];
  //           nodesToExpand.forEach(node => {
  //             if(node.children){
  //               result.push(...node.children);
  //               newNodesToExpand.push(...node.children);
  //             }
  //           });
  //           nodesToExpand = newNodesToExpand;
  //         }
  //         return result;
  //       }
  //     ));
  // }

  // getAllSubcategories(parentCategoryNode: TreeNode): TreeNode[] {
  //   let result: TreeNode[] = [parentCategoryNode];
  //   let nodesToExpand: TreeNode[] = [parentCategoryNode];

  //   while (nodesToExpand.length > 0) {
  //     let newNodesToExpand: TreeNode[] = [];
  //     nodesToExpand.forEach(node => {
  //       if (node.children) {
  //         result.push(...node.children);
  //         newNodesToExpand.push(...node.children);
  //       }
  //     });
  //     nodesToExpand = newNodesToExpand;
  //   }
  //   return result;
  // }

  getAllSubcategories(parentCategoryNode: TreeNode): TreeNode[] {
    let result: TreeNode[] = [];
    if(parentCategoryNode.children){
      result.push(...parentCategoryNode.children);
      parentCategoryNode.children.forEach(child =>{
        result.push(...this.getAllSubcategories(child));
      });
    }
    return result;
  }

  getAllAsTreeNode(): Observable<TreeNode | undefined>{
    if(this.productCategoryTree){
      return of(this.productCategoryTree);
    }
    return this.getAll().pipe(
      map(
        productCategories => this.productCategoriesToTreeNode(productCategories)
      )
    )
  }

  private refreshProductCategories(): Observable<Map<number, ProductCategory> | null>{
    return this.dataService.getAll<ProductCategory[]>(this.url)
    .pipe(
      map(items =>{
        console.log('categories from server : \n', items.body);
        //this.productCategories = items.body;
        this.productCategories = new Map();
        items.body?.forEach(productCategory =>{
          //this.productCategories![productCategory.id!] = productCategory;
          this.productCategories!.set(productCategory.id!, productCategory);
        });
        return this.productCategories;
      })  
    );
  }

  get(id: number):Observable<ProductCategory | undefined>{
    return this.getAll().pipe(
      map(
        productCategories => productCategories?.get(id)
      )
    )
  }

  create(productCategory: ProductCategory):Observable<Object>{
    return this.dataService.post(this.url, productCategory).pipe(
      tap(
        () => this.productCategories = null
      )
    );
  }

  update(productCategory: ProductCategory, id: number): Observable<Object>{
    return this.dataService.put(this.url + '/' + id, productCategory).pipe(
      tap(
        () => this.productCategories = null
      )
    );
  }

  private productCategoriesToTreeNode(productCategories :Map<number, ProductCategory> | null): TreeNode | undefined{
    let result: TreeNode | undefined= undefined;
    if (productCategories) {
      let root = productCategories.get(1);
      if(root){
        result = this.mapProductCategoryToFileNode(root, [...productCategories.values()]);
      }
    }
    return result;
  }

  private mapProductCategoryToFileNode(productCategory: ProductCategory, productCategories: ProductCategory[]): TreeNode{
    let children = productCategories.filter((value) => value.parentId === productCategory.id)
    .map((c => this.mapProductCategoryToFileNode(c, productCategories)));
    return {
      id: productCategory.id!,
      name: productCategory.name,
      children: children
    }
  }

  private getChildren(productCategory: ProductCategory, productCategories: ProductCategory[]): ProductCategory[]{
    let children = productCategories.filter((value) => value.parentId === productCategory.id);
    children.forEach(c => {children.push(...this.getChildren(c, productCategories))});
    return children;
  }

}
