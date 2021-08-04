import { Injectable, Optional } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { QuixHttpErrorService } from './quix-http-error.service'
import { QuangDialogConfig } from '../quang-dialog.config'

@Injectable()
/**
 * http erro interceptor
 */
export class QuixHttpErrorInterceptor implements HttpInterceptor {
  /**
   * no loader interceptor for this url or error
   */
  noErrorUrls: { url: string, error: number }[] = []
  /**
   * window access
   */
  _window = (): any => window

  /**
   * constructor
   * @param quixHttpErrorService
   * @param config
   */
  constructor (
    private readonly quixHttpErrorService: QuixHttpErrorService,
    @Optional() config?: QuangDialogConfig
  ) {
    if (config.noErrorUrls?.length) {
      this.noErrorUrls = config.noErrorUrls
    } else if (this._window().quixConfig?.noErrorUrls) {
      this.noErrorUrls = this._window().quixConfig?.noErrorUrls
    } else {
      this.noErrorUrls = []
    }
  }

  /**
   * intercepts the call, checks if the url should display the error modal,
   * if it displays the error modal
   * @param request http request http request
   * @param next http observable
   */
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((resp: HttpEvent<any>) => {
        return resp
      }),
      catchError((error: HttpErrorResponse) => {
        if (this.noErrorUrls?.length) {
          if (!this.noErrorUrls.find(rule => rule.error === error.status && error.url.includes(rule.url))) {
            this.quixHttpErrorService.openErrorModal(error)
          }
        } else {
          this.quixHttpErrorService.openErrorModal(error)
        }
        return throwError(error)
      })
    )
  }
}
