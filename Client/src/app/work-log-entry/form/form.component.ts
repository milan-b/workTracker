import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.model';
import { ProductService } from 'src/app/product/product.service';
import { WorkLogEntry } from '../work-log-entry.model';
import { WorkLogEntryService } from '../work-log-entry.service';
import { NotificationsService } from 'src/app/shared';
import * as routs from 'src/app/routs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  products: Product[] = [];
  units: string[] = [];
  workLogId: string | null = null;
  id: string | null = null;
  title = "Create";

  form = this.formBuilder.group({
    product: this.formBuilder.control<number | undefined>({ value: undefined, disabled: false }),
    amount: [0, Validators.required],
    unit: ['', Validators.required],
    note: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private workLogEntryService: WorkLogEntryService,
    private notificationService: NotificationsService,
    private router: Router,
    productService: ProductService
  ) {
    productService.getAll().subscribe(products => {
      this.products = products!;
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.workLogId = this.route.snapshot.paramMap.get('workLogId');

    if (this.id) {
      this.title = 'Edit';
      this.workLogEntryService.get(this.workLogId!, this.id).subscribe({
        next: workLogEntry => {
          this.form.patchValue({
            product: workLogEntry?.productId,
            amount: workLogEntry?.amount,
            unit: workLogEntry?.unit,
            note: workLogEntry?.note
          });
          this.setUnits();
          this.form.patchValue({
            unit: workLogEntry?.unit
          });
        },
        error: () => {
          this.notificationService.showError('Error while getting work log entry.');
          this.router.navigate([routs.WORK_LOG_ENTRY]);
        }
      })
    }
  }

  setUnits() {
    let product = this.products.find(p => p.id === this.form.value.product);
    if (product) {
      this.units = product.units!.split(',').map(i => i.trim());
      this.form.patchValue({
        unit: this.units[0]
      });
    }
    else {
      this.units = [];
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      let request = this.id ?
        this.workLogEntryService.update([this.getModelFromForm()]) :
        this.workLogEntryService.create([this.getModelFromForm()]);
      request.subscribe(() => {
        this.notificationService.showInfo(`Work log entry is saved.`);
        this.router.navigate([routs.WORK_LOG_ENTRY + '/' + this.workLogId]);
      });
    }
  }

  private getModelFromForm(): WorkLogEntry {
    return {
      id: this.id,
      workLogId: this.workLogId!,
      productId: this.form.value.product!,
      amount: this.form.value.amount!,
      unit: this.form.value.unit!,
      note: this.form.value.note ? this.form.value.note : ''
    }
  }

}
