import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-notification',
  templateUrl: './info-notification.component.html',
  styleUrls: ['./info-notification.component.scss']
})
export class InfoNotificationComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
