import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import * as routs from 'src/app/routs';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { 
    path: routs.HOME, 
    component: ListComponent 
  },
  {
    path: routs.CREATE,
    component: FormComponent
  },
  {
    path: routs.EDIT,
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
