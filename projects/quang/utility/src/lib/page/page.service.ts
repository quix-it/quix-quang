import { Injectable } from '@angular/core'
import { fromEvent, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class QuangPageService {
  /**
   *
   */
  getPageState(): string {
    return document.visibilityState
  }

  /**
   *
   */
  observePageFreeze(): Observable<any> {
    return fromEvent(document, 'freeze')
  }

  /**
   *
   */
  observePageResume(): Observable<any> {
    return fromEvent(document, 'resume')
  }
}
