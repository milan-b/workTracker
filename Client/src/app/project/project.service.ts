import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { Project } from './project.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private dataService: DataService) { }

  getAll(): Observable<Project[] | null> {
    return this.dataService.getAll<Project[]>('Project')
      .pipe(
        map(items => 
          items.body)
      );
  }
}
