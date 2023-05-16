import { Injectable } from '@angular/core'
import { fromEvent, Observable } from 'rxjs'

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
