import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.model';
import { ProductService } from 'src/app/product/product.service';
import { WorkLogEntry } from '../work-log-entry.model';
import { WorkLogEntryService } from '../work-log-entry.service';
import { NotificationsService, TreeNode, YesNoDialog, YesNoDialogService } from 'src/app/shared';
import * as routs from 'src/app/routs';
import { ProductCategory, ProductCategoryService, SelectDialogComponent } from 'src/app/product-category';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  currentProcutCategory: number = 1;
  products: Product[] = [];
  productNamesByIds: string[] = [];
  filteredProducts: Product[] = [];
  productCategories: Map<number, ProductCategory> | null = null;
  unitsByProduct: Map<number | undefined, string[]> = new Map<number | undefined, string[]>();
  workLogId: string | null = null;
  id: string | null = null;
  title = $localize`Create`;

  form = this.getNewForm();
  childProductForms: FormGroup[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private workLogEntryService: WorkLogEntryService,
    private notificationService: NotificationsService,
    private productCategoryService: ProductCategoryService,
    private router: Router,
    private dialog: MatDialog,
    private yesNoDialogService: YesNoDialogService,
    productService: ProductService
  ) {
    this.unitsByProduct.set(undefined, []);
    productService.getAll().subscribe(products => {
      this.products = products!;
      this.products.forEach(product => { this.productNamesByIds[product.id!] = product.name; })
      this.filteredProducts = this.products;
    });
    this.productCategoryService.getAll().subscribe(result => {
      this.productCategories = result;
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.workLogId = this.route.snapshot.paramMap.get('workLogId');
    this.initForm();
  }

  initForm() {
    if (this.id) {
      this.title = $localize`Edit`;
      this.workLogEntryService.get(this.workLogId!, this.id).subscribe({
        next: workLogEntry => {
          this.form.patchValue({
            product: workLogEntry?.productId,
            amount: workLogEntry?.amount,
            unit: workLogEntry?.unit,
            note: workLogEntry?.note
          });
          let product = this.products.find(p => p.id === this.form.value.product);
          this.setUnits(product, this.form);
          this.form.patchValue({
            unit: workLogEntry?.unit
          });
        },
        error: () => {
          this.notificationService.showError($localize`Error while getting work log entry.`);
          this.router.navigate([routs.WORK_LOG_ENTRY]);
        }
      })
    }
  }

  getNewForm() {
    return this.formBuilder.group({
      product: this.formBuilder.control<number | undefined>({ value: undefined, disabled: false }, Validators.required),
      amount: [0, Validators.required],
      unit: ['', Validators.required],
      note: ['']
    });
  }

  onProductSelect() {
    this.setChildProducts();
    let product = this.products.find(p => p.id === this.form.value.product);
    this.setUnits(product, this.form);
  }

  setChildProducts() {
    this.childProductForms = [];
    let childProducts = this.products.filter(p => p.parentId === this.form.value.product);
    childProducts.forEach(product => {
      let form = this.getNewForm();
      this.setUnits(product, form);
      form.patchValue({
        product: product.id
      });
      this.childProductForms.push(form);
    });

    console.log(childProducts, this.products);
  }

  setUnits(product: Product | undefined, form: FormGroup) {
    if (product) {
      let units = product.units!.split(',').map(i => i.trim());
      this.unitsByProduct.set(product.id, units);
      form.patchValue({
        unit: units[0]
      });
    }
  }

  onSubmit(): void {
    //INFO there is nothing to be invalid in childProductForms 
    if (this.form.valid) {
      let data = [this.getModelFromForm(this.form)]
      this.childProductForms.forEach(form => {
        if (form.value.amount! > 0) {
          data.push(this.getModelFromForm(form));
        }
      });
      let logsForUpdate: WorkLogEntry[] = [];
      let logsForCreate: WorkLogEntry[] = [];
      data.forEach(log => {
        if (log.id) {
          logsForUpdate.push(log);
        } else {
          logsForCreate.push(log);
        }
      });
      let observables: Observable<Object>[] = [];
      if (logsForCreate.length > 0) {
        observables.push(this.workLogEntryService.create(logsForCreate));
      }
      if (logsForUpdate.length > 0) {
        observables.push(this.workLogEntryService.update(logsForUpdate));
      }

      combineLatest(observables).subscribe(() => {
        this.notificationService.showInfo($localize`Work log entry is saved.`);
        this.goBack();
      });
      // let request = this.id ?
      //   this.workLogEntryService.update(data) :
      //   this.workLogEntryService.create(data);
      // request.subscribe(() => {
      //   this.notificationService.showInfo($localize`Work log entry is saved.`);
      //   this.goBack();
      // });
    }
  }

  cancle() {
    console.log(this.form.touched);
    if (this.form.touched) {
      const data = new YesNoDialog($localize`Form data is not saved. Are you sure that you want to leave it?`);
      this.yesNoDialogService.open(data).subscribe(result => {
        if (result) {
          this.goBack();
        }
      });
    } else {
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate([routs.WORK_LOG_ENTRY + '/' + this.workLogId]);
  }

  private getModelFromForm(form: FormGroup): WorkLogEntry {
    return {
      id: this.id,
      workLogId: this.workLogId!,
      productId: form.value.product!,
      amount: form.value.amount!,
      unit: form.value.unit!,
      note: form.value.note ? form.value.note : ''
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      data: { name: "Milan", animal: "hund" },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: TreeNode) => {
      if (result) {
        this.currentProcutCategory = result.id;
        if (this.currentProcutCategory === 1) {
          this.filteredProducts = this.products;
        } else {
          let filteredCategories = this.productCategoryService.getAllSubcategories(result).map(o => o.id);
          filteredCategories.push(result.id);
          this.filteredProducts = this.products.filter(p => filteredCategories.indexOf(p.productCategoryId) > -1);
        }
      }

    });
  }

}
