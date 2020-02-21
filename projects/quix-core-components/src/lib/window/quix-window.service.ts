import {Injectable} from '@angular/core';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class QuixWindowService {
  get nativeWindow(): any {
    return getWindow();
  }
}
