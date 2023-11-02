import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListDataSource } from './list-datasource';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { Router } from '@angular/router';
import * as routs from 'src/app/routs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Project>;

  constructor(private projectService: ProjectService, private router: Router) { }

  dataSource = new ListDataSource(this.projectService);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'createdDate', 'description', 'actions'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  goToEdit(id: number) {
    this.router.navigate([routs.PROJECT + '/' + routs.EDIT_ID + id]);
  }

  goToCreate() {
    this.router.navigate([routs.PROJECT + '/' + routs.CREATE]);
  }
}
