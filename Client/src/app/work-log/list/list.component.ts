import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListDataSource } from './list-datasource';
import { WorkLogService } from '../work-log.service';
import { WorkLog } from '../work-log.model';
import { Project } from 'src/app/project/project.model';
import { ProjectService } from 'src/app/project/project.service';

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

    ){
     
    }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
