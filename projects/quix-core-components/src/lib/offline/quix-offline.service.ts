import {Injectable} from '@angular/core';
import {fromEvent, merge, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuixOfflineService {

  constructor() {
  }

  getConnectionObserver() {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)),
    );
  }
}
