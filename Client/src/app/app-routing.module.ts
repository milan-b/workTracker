import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routs from './routs';

// TODO Add title - https://angular.io/guide/router


const routes: Routes = [
  { 
    path: routs.PROJECT, 
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) 
  },
  { 
    path: routs.PRODUCT_CATEGORY, 
    loadChildren: () => import('./product-category/product-category.module').then(m => m.ProductCategoryModule) 
  },
  

  { path: '**', redirectTo: routs.HOME }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
