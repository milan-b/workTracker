import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorNotificationComponent } from './notifications/error-notification/error-notification.component';
import { InfoNotificationComponent } from './notifications/info-notification/info-notification.component';
import { YesNoDialogComponent } from './dialogs/yes-no-dialog/yes-no-dialog.component';



@NgModule({
  declarations: [
    ErrorNotificationComponent,
    InfoNotificationComponent,
    YesNoDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], 
  exports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class SharedModule { }
