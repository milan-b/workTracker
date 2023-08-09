import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialCategoryComponent } from './material-category.component';

const routes: Routes = [{ path: '', component: MaterialCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialCategoryRoutingModule { }
