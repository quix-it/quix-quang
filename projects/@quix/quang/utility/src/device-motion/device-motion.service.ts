import { Injectable } from '@angular/core'

import { Observable, fromEvent } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class QuangDeviceMotionService {
  /**
   *
   */
  getDeviceMotion(): Observable<any> {
    return fromEvent(window, 'devicemotion')
  }
}
