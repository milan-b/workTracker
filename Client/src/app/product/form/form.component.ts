import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService, TreeNode } from 'src/app/shared';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as routs from 'src/app/routs';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs';
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
  title = 'New';

  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    productCategoryId: this.formBuilder.control<number | undefined>({value: undefined, disabled: false}),
    units: ['', Validators.required]
  });

  // TODO productCategoryId ne valudira iz nekog razloga - ne dobijam poruku o gresci kada je prazan
  // Moza je to zato sto nije postavljen form control name nigdje

  @ViewChild(MatSelect)
  productCategorySelect: MatSelect | undefined;

  // allProductCategories$: Observable<ProductCategory[]  | null>;
  productCategories: Map<number, ProductCategory> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) {
      // this.allProductCategories$ = this.productCategoryService.getAll();
      this.productCategoryService.getAll().subscribe(result => {
        this.productCategories = result;
      });
     }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = 'Edit';
      this.productService.get(+this.id).subscribe({
        next: product => {
          this.productForm.patchValue({
            name: product?.name,
            productCategoryId: product?.productCategoryId,
            units : product?.units
          });
        },
        error: () => {
          this.notificationService.showError('Error while getting product.');
          this.router.navigate([routs.PRODUCT]);
        }
      })
    }
  }

  openModal(): void{
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: TreeNode) => {
      this.productCategorySelect?.close();
      console.log(result, 'result from modala');
      this.productForm.patchValue({
        productCategoryId: result?.id
      });
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      let request = this.id ?
        this.productService.update(this.getModelFromForm(), +this.id) :
        this.productService.create(this.getModelFromForm());
      request.subscribe(() => {
        this.notificationService.showInfo(`Product ${this.productForm.value.name} is saved.`);
        this.router.navigate([routs.PRODUCT]);
      });
    }
  }

  private getModelFromForm(): Product {
    return {
      name: this.productForm.value.name!,
      units: this.productForm.value.units!,
      productCategoryId: this.productForm.value.productCategoryId!
    }
  }
}
