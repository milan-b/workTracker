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
  { 
    path: routs.PRODUCT, 
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule) 
  },
  { 
    path: routs.WORK_LOG, 
    loadChildren: () => import('./work-log/work-log.module').then(m => m.WorkLogModule) 
  },
  { 
    path: routs.WORK_LOG_ENTRY, 
    loadChildren: () => import('./work-log-entry/work-log-entry.module').then(m => m.WorkLogEntryModule) 
  },
  { 
    path: routs.PERSON, 
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule) 
  },
  

  { path: '**', redirectTo: routs.HOME }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
