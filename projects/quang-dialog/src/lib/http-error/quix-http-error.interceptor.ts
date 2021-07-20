import { Injectable, Optional } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { QuixHttpErrorService } from './quix-http-error.service'
import { QuangDialogConfig } from '../quang-dialog.config'

@Injectable()
export class QuixHttpErrorInterceptor implements HttpInterceptor {
  noErrorUrls: { url: string, error: number }[] = []
  _window = (): any => window

  constructor (
    private quixHttpErrorService: QuixHttpErrorService,
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
