import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    SharedModule,
    PersonRoutingModule,
  ]
})
export class PersonModule { }
