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

  getAllAsMap():Observable<Map<number, Project> | null> {
    return this.getAll().pipe(
      map(projects => {
        const projectsMap: Map<number, Project> = new Map();
        projects?.forEach(project => projectsMap.set(project.id!, project));
        return projectsMap;
      })
    )
  }

  get(id: number):Observable<Project | null>{
    return this.dataService.getById<Project>(this.url, '' + id);
  }

  create(project: Project):Observable<Object>{
    return this.dataService.post(this.url, project);
  }

  update(project: Project, id: number): Observable<Object>{
    return this.dataService.put(this.url + '/' + id, project);
  }
}
