import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Planet } from './planet.model'

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  constructor(private readonly http: HttpClient) {}

  getPlanets(): Observable<Planet[]> {
    return this.http
      .get('https://swapi.dev/api/planets')
      .pipe(
        map((r: any) =>
          r.results.map((p: any) => new Planet(p.url, p.name, p.terrain))
        )
      )
  }

  getPlanet(id: string): Observable<Planet> {
    return this.http
      .get(`https://swapi.dev/api/planets/${id}`)
      .pipe(map((r: any) => new Planet(r.url, r.name, r.terrain)))
  }
}
