import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared';
import { ListComponent } from './list/list.component';




@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
