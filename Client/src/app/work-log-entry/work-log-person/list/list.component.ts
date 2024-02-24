import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListDataSource, ListItem } from './list-datasource';

@Component({
  selector: 'app-work-log-person',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class WorkLogPersonListComponent implements AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ListItem>;
  dataSource = new ListDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'date', 'hours'];

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
/**
 * ostati sa tabelom, na osnovu datuma work-log-a postaviti datume u hederu tabele
 * u tjelu tabele ostaviti picker za broj sati sa inkrementom od pola sata,
 * na + dodavati novi red, dodavati novog radnika - mozda staviti upozorenje ako je isti radnik naveden dva puta.
 */