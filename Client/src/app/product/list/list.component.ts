import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListDataSource } from './list-datasource';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductCategory, ProductCategoryService } from 'src/app/product-category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit {
 // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;

  productCategories: ProductCategory[] | null = null;

  constructor(
    private productService : ProductService,
    private productCategoryService: ProductCategoryService
    ){
      this.productCategoryService.getAll().subscribe(result => {
        this.productCategories = result;
        this.displayedColumns.push('productCategory');
      });
    }

  dataSource = new ListDataSource(this.productService);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'name', 'units'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
   // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
