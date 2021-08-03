import { Injectable } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'

@Injectable({
  providedIn: 'root'
})
/**
 * utility for layout
 */
export class QuixLayoutService {
  /**
   * constructor
   * @param breakpointObserver
   */
  constructor (
    private readonly breakpointObserver: BreakpointObserver
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
