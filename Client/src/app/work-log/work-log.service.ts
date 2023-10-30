import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { Observable, map, merge, of, tap, zip } from 'rxjs';
import { WorkLog } from './work-log.model';
import { ProjectService } from '../project/project.service';

@Injectable({
  providedIn: 'root'
})
export class WorkLogService {

  constructor(private dataService: DataService, private projectService: ProjectService) { }

  private url = 'worklog';

  private workLogs: WorkLog[] | null = null;

  getAll(): Observable<WorkLog[] | null> {
    if(this.workLogs){
      return of(this.workLogs);
    }
    return this.refreshProducts();
  }

  private refreshProducts(): Observable<WorkLog[] | null>{
    return zip(this.dataService.getAll<WorkLog[]>(this.url), this.projectService.getAllAsMap())
    .pipe(
      map(items =>{
        console.log('worklogs from server : \n', items[0].body);
        this.workLogs = items[0].body!.map(workLog => {
          workLog.projectName = items[1]?.get(workLog.projectId)?.name;
          return workLog;
        });
        return this.workLogs;
      })  
    );
  }

  get(id: string):Observable<WorkLog | undefined>{
    return this.getAll().pipe(
      map(
        workLogs => workLogs?.find(workLog => workLog.id === id)
      )
    )
  }

  // getAllAsMap():Observable<Map<string, WorkLog> | null> {
  //   return this.getAll().pipe(
  //     map(workLogs => {
  //       const workLogsMap: Map<string, WorkLog> = new Map();
  //       workLogs?.forEach(workLog => workLogsMap.set(workLog.id!, workLog));
  //       return workLogsMap;
  //     })
  //   )
  // }

  create(workLog: WorkLog):Observable<Object>{
    return this.dataService.post(this.url, workLog).pipe(
      tap( () => this.workLogs = null)
    );
  }

  update(workLog: WorkLog, id: string): Observable<Object>{
    return this.dataService.put(this.url + '/' + id, workLog).pipe(
      tap( () => this.workLogs = null)
    );
  }

  approve(workLogId: string): Observable<Object>{
    return this.dataService.putNoData(this.url + '/' + workLogId + '/approve').pipe(
      tap( () => this.workLogs = null)
    );
  }

}
