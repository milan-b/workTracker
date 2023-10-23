import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListDataSource } from './list-datasource';
import { WorkLogService } from '../work-log.service';
import { WorkLog } from '../work-log.model';
import { Router } from '@angular/router';
import * as routs from 'src/app/routs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<WorkLog>;
  dataSource = new ListDataSource(this.workLogService);




  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'isApproved', 'project'];

  constructor(
    private workLogService: WorkLogService,
    private router: Router
    ){
     
    }

  goToEntrys(workLog: WorkLog){
    this.router.navigate([routs.WORK_LOG_ENTRY + '/' + workLog.id]);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
