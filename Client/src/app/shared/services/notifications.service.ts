import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from '../notifications/error-notification/error-notification.component';
import { InfoNotificationComponent } from '../notifications/info-notification/info-notification.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  config: MatSnackBarConfig = {
    duration: 10000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center'
};

  constructor(private snackBar: MatSnackBar) { }

  showError(errorMessage: string) {
      this.snackBar.openFromComponent(ErrorNotificationComponent,{
          data: errorMessage,
          ...this.config
      });
  }

  showInfo(infoMessage: string) {
      this.snackBar.openFromComponent(InfoNotificationComponent, {
        data: infoMessage,
        ...this.config
      });
  }

  // showWarning(infoMessage: string) {
  //     this.snackBar.openFromComponent(WarningBarComponent, {
  //         duration: this.durationInSeconds * 1000,
  //         data: infoMessage,
  //       verticalPosition: 'bottom',
  //         horizontalPosition: 'left'
  //     });
  // }
}
