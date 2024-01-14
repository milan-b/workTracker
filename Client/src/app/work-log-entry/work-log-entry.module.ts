import { NgModule } from '@angular/core';

import { WorkLogEntryRoutingModule } from './work-log-entry-routing.module';
import { SharedModule } from '../shared';
import { ListComponent } from './work-log-product/list/list.component';
import { FormComponent } from './work-log-product/form/form.component';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import { SingPadComponent } from './sing-pad/sing-pad.component';
import { WorkLogEntryComponent } from './work-log-entry.component';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DocumentDialogComponent,
    SingPadComponent, 
    WorkLogEntryComponent
  ],
  imports: [
    SharedModule,
    WorkLogEntryRoutingModule
  ]
})
export class WorkLogEntryModule { }
