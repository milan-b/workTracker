import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService, TreeNode } from 'src/app/shared';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as routs from 'src/app/routs';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductCategory, ProductCategoryService, SelectDialogComponent } from 'src/app/product-category';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  id: string | null = null;
  title = $localize`Create`;

  products: Product[] = [];
  //filteredProducts: Product[] = [];

  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    parent: this.formBuilder.control<number | undefined>({ value: undefined, disabled: false }),
    productCategoryId: this.formBuilder.control<number | undefined>({ value: undefined, disabled: false }, Validators.required),
    units: ['', Validators.required]
  });

  // TODO productCategoryId ne valudira iz nekog razloga - ne dobijam poruku o gresci kada je prazan
  // Moza je to zato sto nije postavljen form control name nigdje

  @ViewChild(MatSelect)
  productCategorySelect: MatSelect | undefined;
  productCategories: Map<number, ProductCategory> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) {
    productService.getAll().subscribe(products => {
      this.products = products!;
      //this.filteredProducts = this.products;
    });
    this.productCategoryService.getAll().subscribe(result => {
      this.productCategories = result;
    });
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = $localize`Edit`;
      this.productService.get(+this.id).subscribe({
        next: product => {
          this.productForm.patchValue({
            name: product?.name,
            parent: product?.parentId,
            productCategoryId: product?.productCategoryId,
            units: product?.units
          });
        },
        error: () => {
          this.notificationService.showError($localize`Error while getting product.`);
          this.router.navigate([routs.PRODUCT]);
        }
      })
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: TreeNode) => {
      this.productCategorySelect?.close();
      this.productForm.patchValue({
        productCategoryId: result?.id
      });
      // if (result) {
      //   if (result.id === 1) {
      //     this.filteredProducts = this.products;
      //   } else {
      //     let filteredCategories = this.productCategoryService.getAllSubcategories(result).map(o => o.id);
      //     filteredCategories.push(result.id);
      //     this.filteredProducts = this.products.filter(p => filteredCategories.indexOf(p.productCategoryId) > -1);
      //   }
      // }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      let request = this.id ?
        this.productService.update(this.getModelFromForm(), +this.id) :
        this.productService.create(this.getModelFromForm());
      request.subscribe(() => {
        this.notificationService.showInfo($localize`Product ${this.productForm.value.name}:product name: is saved.`);
        this.router.navigate([routs.PRODUCT]);
      });
    }
  }

  private getModelFromForm(): Product {
    return {
      name: this.productForm.value.name!,
      parentId: this.productForm.value.parent === null ? undefined : this.productForm.value.parent,
      units: this.productForm.value.units!,
      productCategoryId: this.productForm.value.productCategoryId!
    }
  }
}
