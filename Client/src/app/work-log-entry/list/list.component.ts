import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ListDataSource } from './list-datasource';
import { WorkLogEntryService } from '../work-log-entry.service';
import { WorkLogEntry } from '../work-log-entry.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as routs from 'src/app/routs';
import { WorkLogService } from 'src/app/work-log/work-log.service';
import { WorkLog } from 'src/app/work-log/work-log.model';
import { NotificationsService, YesNoDialog, YesNoDialogService } from 'src/app/shared';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<WorkLogEntry>;
  dataSource: ListDataSource | undefined;
  workLog: WorkLog | undefined;

  constructor(
    private workLogEntryService: WorkLogEntryService,
    private workLogService: WorkLogService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private yesNoDialogService: YesNoDialogService,
    public dialog: MatDialog) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['productName', 'amount', 'unit', 'note', 'actions'];


  ngOnInit(): void {
    const workLogId = this.route.snapshot.paramMap.get('workLogId');
    this.dataSource = new ListDataSource(this.workLogEntryService, workLogId!);
    this.workLogService.get(workLogId!).subscribe(workLog => this.workLog = workLog);
  }

  ngAfterViewInit(): void {
    this.dataSource!.sort = this.sort;
    this.table.dataSource = this.dataSource!;
  }

  goToCreate() {
    if (this.workLog!.isApproved) {
      this.notificationService.showInfo($localize`You can\'t add entries to approved work log.`);
    } else {
      this.router.navigate([routs.WORK_LOG_ENTRY + '/' + this.workLog!.id! + '/' + routs.CREATE]);
    }
  }

  goToEdit(workLogEntryId: string) {
    if (this.workLog!.isApproved) {
      this.notificationService.showInfo($localize`You can\'t change entries in approved work log.`);
    } else {
      this.router.navigate([routs.WORK_LOG_ENTRY + '/' + this.workLog!.id! + '/' + routs.EDIT_ID + workLogEntryId]);
    }
  }

  goToEditWorkLog(){
    this.router.navigate([routs.WORK_LOG + '/' + routs.EDIT_ID + this.workLog!.id!]);
  }

  delete(workLogEntryId: string) {
    if (this.workLog!.isApproved) {
      this.notificationService.showInfo($localize`You can\'t change entries in approved work log.`);
    } else {
      const data = new YesNoDialog($localize`Are you sure that you want to delete this work log entry?`);
      this.yesNoDialogService.open(data).subscribe(result => {
        if(result){
          this.workLogEntryService.delete(workLogEntryId).subscribe(() =>{
            this.notificationService.showInfo($localize`Work log entry is deleted.`);
            this.dataSource?.refreshData();
          });
        }
      });
    }

  }

  approveWorkLog() {
    const dialogRef = this.dialog.open(DocumentDialogComponent, {data:
      {
       entries: this.dataSource?.getData(),
       workLog: this.workLog
      }});
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

}
