import { Component, ViewChild } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductCategoryService } from '../product-category.service';
import { NotificationsService, TreeNode } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import * as routs from 'src/app/routs';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProductCategory } from '../product-category.model';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  id: string | null = null;
  title = $localize`Create`;

  productCategoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    parentId: this.formBuilder.control<number | undefined>({value: undefined, disabled: false}, Validators.required)
  });

  //allProductCategories$: Observable<ProductCategory[]  | null>;
  productCategories: Map<number, ProductCategory> | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) 
    {
      //this.allProductCategories$ = this.productCategoryService.getAll();
      this.productCategoryService.getAll().subscribe(result => {
        this.productCategories = result;
      });
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = $localize`Edit`;
      this.productCategoryService.get(+this.id).subscribe({
        next: productCategory => {
          this.productCategoryForm.patchValue({
            name: productCategory?.name,
            parentId: productCategory?.parentId
          });
        },
        error: () => {
          this.notificationService.showError($localize`Error while getting project.`);
          this.router.navigate([routs.PROJECT]);
        }
      })
    }
  }

  openModal(): void{
      const dialogRef = this.dialog.open(SelectDialogComponent, {
        data: {name: "Milan", animal: "hund"},
        disableClose: false
      });
  
      dialogRef.afterClosed().subscribe((result: TreeNode) => {
        console.log('The dialog was closed', result);
        //TODO add validation - can't select child to be a new parent
        this.productCategoryForm.patchValue({
          parentId: result?.id
        });
      });
    }

  onSubmit(): void {
    console.log(this.productCategoryForm);
    if (this.productCategoryForm.valid) {
      let request = this.id ?
        this.productCategoryService.update(this.getModelFromForm(this.productCategoryForm.value), +this.id) :
        this.productCategoryService.create(this.getModelFromForm(this.productCategoryForm.value));
      request.subscribe(() => {
        this.notificationService.showInfo($localize`Product category ${this.productCategoryForm.value.name}:prodcut category name: is saved.`);
        this.router.navigate([routs.PRODUCT_CATEGORY]);
      });
    }
  }



  private getModelFromForm(formValue: {name?: string | null, parentId?: number | null}): ProductCategory {
    return {
      name: formValue.name!,
      parentId: formValue.parentId!
    }
  }

}
