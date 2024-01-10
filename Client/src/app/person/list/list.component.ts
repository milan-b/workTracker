import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListDataSource } from './list-datasource';
import { Person } from '../product.model';
import { PersonService } from '../person.service';

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
  displayedColumns = ['id', 'name'];

  constructor(private personService: PersonService){

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
