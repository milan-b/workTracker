import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { WorkLog } from '../work-log.model';
import { WorkLogService } from '../work-log.service';


export class ListDataSource extends DataSource<WorkLog> {
  data: WorkLog[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private workLogService: WorkLogService) {
    super();
  }

  connect(): Observable<WorkLog[]> {
    if (this.sort) {
      return merge(this.workLogService.getAll(), this.sort.sortChange)
      .pipe(map(data => {
        if(Array.isArray(data)){
          this.data = [...data]; 
        }
        return this.getSortedData(this.data);
      }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}


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
