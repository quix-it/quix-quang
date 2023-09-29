import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, Optional } from '@angular/core'

import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { QuangHttpErrorService } from './error.service'

import { QuangDialogConfig } from '../dialog.config'

/**
 * Interceptor decorator
 */
@Injectable()
/**
 * http erro interceptor
 */
export class QuangHttpErrorInterceptor implements HttpInterceptor {
  /**
   * no loader interceptor for this url or error
   */
  noErrorUrls: Array<{ url: string; error: number }> = []
  /**
   * window access
   */
  _window = (): any => window

  /**
   * constructor
   * @param quangHttpErrorService
   * @param config
   */
  constructor(
    private readonly quangHttpErrorService: QuangHttpErrorService,
    @Optional() config?: QuangDialogConfig
  ) {
    if (config?.noErrorUrls?.length) {
      this.noErrorUrls = config.noErrorUrls
    } else if (this._window().quangConfig?.noErrorUrls) {
      this.noErrorUrls = this._window().quangConfig?.noErrorUrls
    } else {
      this.noErrorUrls = []
    }
  }

  /**
   * intercepts the call, checks if the url should display the error modal,
   * if it displays the error modal
   * @param req http request http request
   * @param next http observable
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((resp: HttpEvent<any>) => {
        return resp
      }),
      catchError((error: HttpErrorResponse) => {
        if (this.noErrorUrls?.length) {
          if (!this.noErrorUrls.find((rule) => rule.error === error.status && error.url?.includes(rule.url))) {
            this.quangHttpErrorService.openErrorModal(error)
          }
        } else {
          this.quangHttpErrorService.openErrorModal(error)
        }
        return throwError(error)
      })
    )
  }
}
