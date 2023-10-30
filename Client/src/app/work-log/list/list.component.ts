import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListDataSource } from './list-datasource';
import { WorkLogService } from '../work-log.service';
import { WorkLog } from '../work-log.model';
import { Router } from '@angular/router';
import * as routs from 'src/app/routs';
import { Project } from 'src/app/project/project.model';
import { ProjectService } from 'src/app/project/project.service';
import { MatSelectChange } from '@angular/material/select';

export interface Filter{
  filterChange: EventEmitter<null>;
  values: Map<string,string>;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<WorkLog>;
  dataSource = new ListDataSource(this.workLogService);
  projects: Project[] | null = [];

  filter: Filter;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'isApproved', 'project', 'user'];

  constructor(
    private workLogService: WorkLogService,
    private router: Router,
    private projectService: ProjectService
    ){
     this.filter = {
      filterChange: new EventEmitter<null>(),
      values: new Map<string, string>()
     }
    }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(projects =>{
      this.projects = projects;
      this.projects?.unshift({name:'', id: undefined});
    });
  }

  applyFilter(event:MatSelectChange,filterName:string) {
    this.filter.values.set(filterName, event.value);
    this.filter.filterChange.emit();
  }

  goToCreate(){
    this.router.navigate([routs.WORK_LOG + '/' + routs.CREATE]);
  }

  goToEntrys(workLog: WorkLog){
    this.router.navigate([routs.WORK_LOG_ENTRY + '/' + workLog.id]);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filter;
    this.table.dataSource = this.dataSource;
  }
}
