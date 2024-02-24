import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routs from 'src/app/routs';
import { FormComponent } from './work-log-product/form/form.component';
import { WorkLogEntryComponent } from './work-log-entry.component';

const routes: Routes = [
  { 
    path: ':workLogId', 
    //component: ListComponent 
    component: WorkLogEntryComponent
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
