import { Injectable } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for layout
 */
export class QuixLayoutService {
  /**
   * constructor
   * @param breakpointObserver material breakpoint utility
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
