import { NgModule } from '@angular/core';

import { WorkLogEntryRoutingModule } from './work-log-entry-routing.module';
import { SharedModule } from '../shared';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import { SingPadComponent } from './sing-pad/sing-pad.component';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DocumentDialogComponent,
    SingPadComponent
  ],
  imports: [
    SharedModule,
    WorkLogEntryRoutingModule,
  ]
})
export class WorkLogEntryModule { }
