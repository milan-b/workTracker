import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ProductCategoryModule } from '../product-category';




@NgModule({
  declarations: [
   ListComponent,
   FormComponent
  ],
  imports: [
    SharedModule,
   // ProductCategoryModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
