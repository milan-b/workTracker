import { Component, OnInit } from '@angular/core';
import { WorkLog } from '../work-log/work-log.model';
import { WorkLogService } from '../work-log/work-log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import * as routs from 'src/app/routs';

@Component({
  selector: 'app-work-log-entry',
  templateUrl: './work-log-entry.component.html',
  styleUrl: './work-log-entry.component.scss'
})
export class WorkLogEntryComponent implements OnInit {

  workLog: WorkLog | undefined;
  tabIndex: number = 0;

  constructor(
    private workLogService: WorkLogService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    const workLogId = this.route.snapshot.paramMap.get('workLogId');
    this.tabIndex = +(this.route.snapshot.queryParamMap.get('tabIndex')?? 0);
    this.workLogService.get(workLogId!).subscribe(workLog => this.workLog = workLog);
  }

  approveWorkLog() {
    const dialogRef = this.dialog.open(DocumentDialogComponent, {
      data:
      {
        entries: [],//this.dataSource?.getData(),
        workLog: this.workLog
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    // if (this.workLog!.isApproved) {
    //   this.notificationService.showInfo($localize`This work log is already approved.`)
    // } else {
    //   this.workLogService.approve(this.workLog!.id!).subscribe(() => {
    //     this.workLog!.isApproved = true;
    //     this.notificationService.showInfo($localize`Work log is approved.`);
    //   });
    // }
  }

  goToEditWorkLog(){
    this.router.navigate([routs.WORK_LOG + '/' + routs.EDIT_ID + this.workLog!.id!]);
  }


}
