import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { WorkLog } from '../work-log.model';
import { WorkLogService } from '../work-log.service';
import { EventEmitter } from '@angular/core';
import { Filter } from './list.component';


export class ListDataSource extends DataSource<WorkLog> {
  data: WorkLog[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: Filter | undefined;


  constructor(private workLogService: WorkLogService) {
    super();
  }

  connect(): Observable<WorkLog[]> {
    return merge(this.workLogService.getAll(), this.sort!.sortChange, this.filter!.filterChange)
      .pipe(map(data => {
        if (Array.isArray(data)) {
          this.data = [...data];
        }
        return this.getSortedData(this.filterData(this.data));
      }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  private filterData(data: WorkLog[]): WorkLog[] {
    console.log(this.filter?.values);
    return data.filter( item =>{
      let isMatch = true;
      for(let [key,value] of this.filter!.values){
        isMatch = (value === undefined) || (item[key as keyof WorkLog] == value); 
        if(!isMatch) return false;
      }
      return isMatch;
    })
  }


  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: WorkLog[]): WorkLog[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'project': return compare(a.projectName!, b.projectName!, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
