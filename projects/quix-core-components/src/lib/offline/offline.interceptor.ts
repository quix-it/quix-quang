import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {combineLatest, Observable, of, timer} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {selectLine} from "./offline-store/offline.selector";
import {delayWhen, map, retryWhen, switchMap} from "rxjs/operators";

@Injectable()
export class QuixOfflineInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<any>
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.pipe(
      select(selectLine),
      map(line => {
        if (!line) {
          throw of(false)
        }
        return of(true);
      }),
      retryWhen(error => error.pipe(
        delayWhen(val => timer(30 * 1000))
      )),
      switchMap(() => next.handle(request))
    )
  }
}
