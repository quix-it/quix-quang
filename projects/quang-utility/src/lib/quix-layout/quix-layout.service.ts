import {Injectable} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class QuixLayoutService {

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

  getOrientation() {
    return this.breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]);
  }
}
