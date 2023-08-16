import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
