import { Injectable } from '@angular/core'
import { fromEvent, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class QuangDeviceService {
  /**
   * returns the type of screen orientation
   */
  getScreenOrientation(): string {
    return window.screen.orientation.type
  }

  /**
   * defines how to lock the device screen
   * @param lockType
   */
  // @ts-ignore @see https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1615
  lockScreenOrientation(lockType: OrientationLockType): void {
    // @ts-ignore @see https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1615
    window.screen.orientation.lock(lockType)
  }

  /**
   * unlock the device screen
   */
  unlockScreenOrientation(): void {
    window.screen.orientation.unlock()
  }

  /**
   * returns the device screen orientation change event
   */
  observeScreenOrientation(): Observable<any> {
    return fromEvent(window.screen.orientation, 'change')
  }

  /**
   * activates the vibration of the device
   * @param time
   */
  vibrate(time: number | number[]): void {
    navigator.vibrate(time)
  }
}
