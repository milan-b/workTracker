import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListDataSource } from './list-datasource';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import * as routs from 'src/app/routs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Person>;
  dataSource = new ListDataSource(this.personService);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private personService: PersonService, private router: Router){

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  goToEdit(id: number) {
    this.router.navigate([routs.PERSON + '/' + routs.EDIT_ID + id]);
  }

  goToCreate() {
    this.router.navigate([routs.PERSON + '/' + routs.CREATE]);
  }
}
