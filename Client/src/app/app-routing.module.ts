import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'material-category',
    loadChildren: () => import('./material-category/material-category.module').then(m => m.MaterialCategoryModule)
  },
  { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
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
