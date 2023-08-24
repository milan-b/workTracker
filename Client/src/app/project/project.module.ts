import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';





@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
