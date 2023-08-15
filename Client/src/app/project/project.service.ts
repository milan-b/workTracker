import { Injectable } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { Project } from './project.model';
import { Observable, map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private dataService: DataService) { }

  getAll(): Observable<Project[] | undefined> {
    return this.dataService.getAll<Project[]>('Project')
      .pipe(
        map(items => items.body?.sort((a, b) => (a.name.toLowerCase() >= b.name.toLocaleLowerCase() ? 1 : -1)))
      );
  }

}
