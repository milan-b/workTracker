import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.sass']
})
export class ErrorNotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
