import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routs from 'src/app/routs';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { 
    path: routs.HOME, 
    component: ListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
