import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { Project } from './project.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private dataService: DataService) { }

  getAll(): Observable<Project[] | undefined> {
    return this.dataService.getAll<Project[]>('Project')
      .pipe(
        map(items => //items.body)
          items.body?.sort((a, b) => (a.name.toLowerCase() >= b.name.toLocaleLowerCase() ? 1 : -1)))
      );
  }
}
