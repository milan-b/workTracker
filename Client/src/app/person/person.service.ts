import { Injectable } from '@angular/core';
import { DataService } from '../shared';
import { Person } from './product.model';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private dataService: DataService) { }

  private url = 'person';

  private persons: Person[] | null = null;

  getAll(): Observable<Person[] | null> {
    if(this.persons){
      return of(this.persons);
    }
    return this.refreshPersons();
  }

  private refreshPersons(): Observable<Person[] | null>{
    return this.dataService.getAll<Person[]>(this.url)
    .pipe(
      map(items =>{
        console.log('prsons from server : \n', items.body);
        this.persons = items.body;
        return this.persons;
      })  
    );
  }

  get(id: number):Observable<Person | undefined>{
    return this.getAll().pipe(
      map(
        persons => persons?.find(person => person.id === id)
      )
    )
  }

  create(person: Person):Observable<Object>{
    return this.dataService.post(this.url, person).pipe(
      tap( () => this.persons = null)
    );
  }

  update(person: Person, id: number): Observable<Object>{
    return this.dataService.put(this.url + '/' + id, person).pipe(
      tap( () => this.persons = null)
    );
  }
}
