import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routs from 'src/app/routs';
import { ListComponent } from './work-log-product/list/list.component';
import { FormComponent } from './work-log-product/form/form.component';

const routes: Routes = [
  { 
    path: ':workLogId', 
    component: ListComponent 
  },
  {
    path: ':workLogId/' + routs.CREATE,
    component: FormComponent
  },
  {
    path: ':workLogId/' + routs.EDIT,
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkLogEntryRoutingModule { }
