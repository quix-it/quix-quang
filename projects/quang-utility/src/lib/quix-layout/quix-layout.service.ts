import { Injectable } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'

@Injectable({
  providedIn: 'root'
})
export class QuixLayoutService {

  constructor (
    private breakpointObserver: BreakpointObserver
  ) {
  }

  /**
   * returns an observable that reports the state of the device orientation
   */
  getOrientation () {
    return this.breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ])
  }
}
