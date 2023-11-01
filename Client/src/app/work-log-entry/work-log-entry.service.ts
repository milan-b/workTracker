import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { Observable, map, zip} from 'rxjs';
import { WorkLogEntry } from './work-log-entry.model';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class WorkLogEntryService {

  constructor(private dataService: DataService, private productSerice: ProductService) { }

  private url = 'worklogentry';

  getAll(workLogId: string): Observable<WorkLogEntry[] | undefined> {
    return zip(this.dataService.getChildren<WorkLogEntry[]>(this.url, workLogId), this.productSerice.getAllAsMap())
      .pipe(
        map(items => {
          console.log('entrys: \n', items[0].body);
          const workLogEntrys = items[0].body?.map(workLogEntry =>{
            const product = items[1]?.get(workLogEntry.productId);
            workLogEntry.productName = product?.name;
            return workLogEntry;
          })
          return workLogEntrys;
        }
          )
      );
  }

  get(workLogId: string, id: string):Observable<WorkLogEntry | undefined>{
    return this.getAll(workLogId)
      .pipe(
        map(workLogEtntres=> workLogEtntres?.find(i => i.id === id))
      );
  }

  create(workLogEntry: WorkLogEntry[]):Observable<Object>{
    return this.dataService.post(this.url, workLogEntry);
  }

  update(workLogEntry: WorkLogEntry[]): Observable<Object>{
    return this.dataService.put(this.url, workLogEntry);
  }

  delete(id: string):Observable<Object>{
    return this.dataService.delete(this.url + '/' + id);
  }

}
