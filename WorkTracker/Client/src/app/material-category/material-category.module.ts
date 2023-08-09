import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialCategoryRoutingModule } from './material-category-routing.module';
import { MaterialCategoryComponent } from './material-category.component';


@NgModule({
  declarations: [
    MaterialCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialCategoryRoutingModule
  ]
})
export class MaterialCategoryModule { }
