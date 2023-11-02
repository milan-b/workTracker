import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ProductCategoryService } from '../product-category.service';
import { NotificationsService, TreeNode } from 'src/app/shared';
import { Router } from '@angular/router';
import * as routs from 'src/app/routs';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() isSelect = false;

  @Output() selectEvent = new EventEmitter<TreeNode>();

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<TreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<TreeNode, TreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<TreeNode, TreeNode>;

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private notificationService: NotificationsService,
    private router: Router) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.setData();
  }

  private setData() {
    this.productCategoryService.getAllAsTreeNode().subscribe(data => {
      if (data) {
        this.dataSource.data = [data];
      }
    });
  }

  /** Transform the data to something the tree can read. */
  transformer(node: TreeNode, level: number): TreeNode {
    return { ...node, level: level };
  }

  /** Get the level of the node */
  getLevel(node: TreeNode): number {
    return node.level ?? 0;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: TreeNode): boolean {
    return true;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: TreeNode): boolean {
    return true;
  }

  /** Get the children for the node. */
  getChildren(node: TreeNode): TreeNode[] | null | undefined {
    return node.children;
  }

  select(node: TreeNode): void {
    this.selectEvent.emit(node);
  }

  goToEdit(id: number) {
    this.router.navigate([routs.PRODUCT_CATEGORY + '/' + routs.EDIT_ID + id]);
  }
  
  goToCreate() {
    this.router.navigate([routs.PRODUCT_CATEGORY + '/' + routs.CREATE]);
  }

  delete(node: TreeNode) {
    if (node.children) {
      let children = this.listToNameString(node.children);
      this.notificationService.showInfo($localize`You can\'t delete this category because it has children. Children of this node are: ${children}`);
      return;
    }

    this.productService.getAllForCategory(node.id).subscribe(products => {
      if (products && products.length > 0) {
        let productNames = this.listToNameString(products);
        this.notificationService.showInfo($localize`You can\'t delete this category because there are some products that belongs to it. Those products are: ${productNames}`);
      } else {
        this.productCategoryService.delete(node.id).subscribe(() => {
          this.notificationService.showInfo($localize`Category deleted`);
          this.setData();
        });
      }
    });

  }

  private listToNameString(list: any[]): string {
    let names = '';
    list.forEach(o => {
      names += o.name + ', '
    });
    names = names.substring(0, names.length - 2);
    return names;
  }
}
