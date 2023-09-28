import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Starship } from './starship.model'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  constructor (
    private readonly http: HttpClient
  ) { }

  getStarships (): Observable<Starship[]> {
    return this.http.get('https://swapi.dev/api/starships').pipe(
      map(
        (r: any) => r.results.map((s: any) => new Starship(s.url, s.name, s.model))
      )
    )
  }

  getStarship (id: string): Observable<Starship> {
    return this.http.get(`https://swapi.dev/api/starships/${id}`).pipe(
      map((r: any) => new Starship(r.url, r.name, r.model))
    )
  }
}
