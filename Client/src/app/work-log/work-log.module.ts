import { NgModule } from '@angular/core';

import { WorkLogRoutingModule } from './work-log-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    SharedModule,
    WorkLogRoutingModule,
    
  ]
})
export class WorkLogModule { }
