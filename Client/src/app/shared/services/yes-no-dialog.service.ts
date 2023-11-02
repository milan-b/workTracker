import { Injectable } from '@angular/core';
import { YesNoDialog } from '../dialogs/yes-no-dialog/yes-no-dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../dialogs/yes-no-dialog/yes-no-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YesNoDialogService {

  constructor(public dialog: MatDialog) {}

  open(data: YesNoDialog): Observable<any> {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {data: data});
    return dialogRef.afterClosed();
  }

}
