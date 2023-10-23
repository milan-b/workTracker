import { NgModule } from '@angular/core';

import { WorkLogEntryRoutingModule } from './work-log-entry-routing.module';
import { SharedModule } from '../shared';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    SharedModule,
    WorkLogEntryRoutingModule,
  ]
})
export class WorkLogEntryModule { }
