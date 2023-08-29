import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ProductCategoryService } from '../product-category.service';
import { TreeNode } from 'src/app/shared';

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
// export interface FlatTreeNode {
//   name: string;
//   type: string;
//   level: number;
//   expandable: boolean;
// }

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

  constructor(private productCategoryService: ProductCategoryService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.productCategoryService.getAll().subscribe(data => {
      if (data) {
        this.dataSource.data = [data];
      }
    });
  }

  /** Transform the data to something the tree can read. */
  transformer(node: TreeNode, level: number): TreeNode {
    return {...node, level: level};
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

  select(node: TreeNode): void{
    this.selectEvent.emit(node);
  }
}
