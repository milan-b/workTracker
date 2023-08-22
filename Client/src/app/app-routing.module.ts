import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routs } from './routs';

// TODO Add title - https://angular.io/guide/router


const routes: Routes = [
  {
    path: routs.MATERIAL_CATEGORY,
    loadChildren: () => import('./material-category/material-category.module').then(m => m.MaterialCategoryModule)
  },
  { path: routs.PROJECT, loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
