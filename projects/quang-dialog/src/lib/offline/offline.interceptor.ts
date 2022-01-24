import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable, of, timer } from 'rxjs'
import { Store } from '@ngrx/store'
import { delayWhen, map, retryWhen, switchMap } from 'rxjs/operators'
import { OfflineSelectors } from './offline-store/selectors'
import { QuangDialogStateModule } from '../quang-dialog.reducers'

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
    private readonly store: Store<QuangDialogStateModule>
  ) {
  }

  /**
   * intercepts the call and if the system is offline it tries again every 30 seconds
   * @param request http request http request
   * @param next http observable
   */
  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store
      .select(OfflineSelectors.selectLine)
      .pipe(
        map(line => {
          if (!line) {
            throw new Error()
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
