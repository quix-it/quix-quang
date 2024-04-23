import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class QuangLoaderService {
  public isLoading$ = new BehaviorSubject<boolean | null>(null)

  show(): void {
    this.isLoading$.next(true)
  }

  hide(): void {
    this.isLoading$.next(false)
  }
}
