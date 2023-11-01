import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, Subject, merge } from 'rxjs';
import { WorkLogEntry } from '../work-log-entry.model';
import { WorkLogEntryService } from '../work-log-entry.service';

/**
 * Data source for the List view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListDataSource extends DataSource<WorkLogEntry> {
  data: WorkLogEntry[] = [];
  sort: MatSort | undefined;
  private data$: Subject<WorkLogEntry[] | undefined> = new Subject();

  constructor(private workLogEntryService: WorkLogEntryService, private id: string) {
    super();
    this.refreshData();
  }

  public refreshData(){
    this.workLogEntryService.getAll(this.id).subscribe(data => this.data$.next(data));
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<WorkLogEntry[]> {
    if (this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.data$, this.sort.sortChange)
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
  private getSortedData(data: WorkLogEntry[]): WorkLogEntry[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'amount': return compare(a.amount, b.amount, isAsc);
        case 'productName': return compare(a.productName!, b.productName!, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
