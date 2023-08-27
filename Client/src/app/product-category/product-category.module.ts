import { NgModule } from '@angular/core';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    SharedModule,
    ProductCategoryRoutingModule
  ]
})
export class ProductCategoryModule { }
