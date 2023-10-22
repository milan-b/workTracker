import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListDataSource } from './list-datasource';
import { WorkLogEntryService } from '../work-log-entry.service';
import { WorkLogEntry } from '../work-log-entry.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<WorkLogEntry>;
  dataSource: ListDataSource | undefined;

  constructor(private workLogEntryService: WorkLogEntryService, private route: ActivatedRoute){   
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['productName', 'amount', 'unit', 'note'];


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataSource = new ListDataSource(this.workLogEntryService, id!);
  }

  ngAfterViewInit(): void {
    this.dataSource!.sort = this.sort;
    this.table.dataSource = this.dataSource!;
  }
}
