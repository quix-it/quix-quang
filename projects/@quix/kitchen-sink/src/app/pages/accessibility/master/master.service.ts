import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { PersonResponse } from './person-response.model'
import { Person } from './person.model'

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(public http: HttpClient) {}

  getPeople(index: number): Observable<PersonResponse> {
    const params = new HttpParams().set('page', index)
    return this.http.get('https://swapi.dev/api/people/', { params }).pipe(
      map(
        (data: any) =>
          new PersonResponse(
            data.count,
            data.results.map(
              (p: any) =>
                new Person(p.name, p.gender, p.height, p.mass, p.url.replace('https://swapi.dev/api/people/', ''))
            )
          )
      )
    )
  }
}
