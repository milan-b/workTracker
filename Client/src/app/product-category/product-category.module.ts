import { NgModule } from '@angular/core';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectDialogComponent } from './select-dialog/select-dialog.component';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    SelectDialogComponent
  ],
  imports: [
    SharedModule,
    ProductCategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductCategoryModule { }
