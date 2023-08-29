import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ProductCategoryService } from '../product-category.service';
import { NotificationsService } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import * as routs from 'src/app/routs';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  id: string | null = null;
  title = 'New';

  productCategoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    parentId: undefined
  });


  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = 'Edit';
      this.productCategoryService.get(+this.id).subscribe({
        next: productCategory => {
          this.productCategoryForm.patchValue({
            name: productCategory?.name,
            parentId: productCategory?.parentId
          });
        },
        error: () => {
          this.notificationService.showError('Error while getting project.');
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
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
       // this.animal = result;
      });
    }

  onSubmit(): void {
    alert('Thanks!');
  }
}
