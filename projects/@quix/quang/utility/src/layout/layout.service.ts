import { BreakpointObserver } from '@angular/cdk/layout'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for layout
 */
export class QuangLayoutService {
  /**
   * constructor
   * @param breakpointObserver material breakpoint utility
   */
  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  /**
   * returns an observable that reports the state of the device orientation
   */
  getOrientation(): Observable<any> {
    return this.breakpointObserver.observe(['(orientation: portrait)', '(orientation: landscape)'])
  }
}
