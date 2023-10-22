import { NgModule } from '@angular/core';

import { WorkLogRoutingModule } from './work-log-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    SharedModule,
    WorkLogRoutingModule
    
  ]
})
export class WorkLogModule { }
