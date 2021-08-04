import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable, of, timer } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectLine } from './offline-store/offline.selector'
import { delayWhen, map, retryWhen, switchMap } from 'rxjs/operators'

/**
 * Interceptor decorator
 */
@Injectable()
/**
 * offline interceptor
 */
export class OfflineInterceptor implements HttpInterceptor {
  /**
   * constructor
   * @param store store access
   */
  constructor (
    private readonly store : Store<any>
  ) {
  }

  /**
   * intercepts the call and if the system is offline it tries again every 30 seconds
   * @param request http request http request
   * @param next http observable
   */
  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.pipe(
      select(selectLine),
      map(line => {
        if (!line) {
          throw of(false)
        }
        return of(true)
      }),
      retryWhen(error => error.pipe(
        delayWhen(val => timer(30 * 1000))
      )),
      switchMap(() => next.handle(request))
    )
  }
}
