import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { Project } from './project.model';
import { Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private dataService: DataService) { }

  private url = 'project';

  getAll(): Observable<Project[] | null> {
    return this.dataService.getAll<Project[]>(this.url)
      .pipe(
        map(items => 
          items.body)
      );
  }

  get(id: number):Observable<Project | null>{
    return this.dataService.getById<Project>(this.url, '' + id);
  }

  // TODO vidjeti kako rijesiti problem sa vremenom - vjerovatno je rijeseno u hrani
  create(project: Project):Observable<Object>{
    return this.dataService.post(this.url, project);
  }

  update(project: Project, id: number): Observable<Object>{
    return this.dataService.put(this.url + '/' + id, project);
  }
}
