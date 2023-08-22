import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { Project } from './project.model';
import { Observable, map } from 'rxjs';

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

  create(project: Project):Observable<Object>{
    return this.dataService.post(this.url, project);
  }
}
