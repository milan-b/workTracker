import { NgModule } from '@angular/core';

import { WorkLogEntryRoutingModule } from './work-log-entry-routing.module';
import { SharedModule } from '../shared';
import { WorkLogProductListComponent } from './work-log-product/list/list.component';
import { FormComponent } from './work-log-product/form/form.component';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import { SingPadComponent } from './sing-pad/sing-pad.component';
import { WorkLogEntryComponent } from './work-log-entry.component';
import { WorkLogPersonListComponent } from './work-log-person/list/list.component';




@NgModule({
  declarations: [
    WorkLogProductListComponent,
    WorkLogPersonListComponent,
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
