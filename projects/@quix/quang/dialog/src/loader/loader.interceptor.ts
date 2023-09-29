import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, Optional } from '@angular/core'

import { Store } from '@ngrx/store'
import { Observable, throwError } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'

import { LoaderActions } from './store/actions'

import { QuangDialogConfig } from '../dialog.config'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * loader interceptor
 */
export class QuangLoaderInterceptor implements HttpInterceptor {
  /**
   * no loader url list
   */
  noLoaderUrls: string[] = []
  /**
   * no loader method list
   */
  noLoaderMethods: string[] = []
  /**
   * window access
   */
  _window = (): any => window

  /**
   * constructor
   * @param store store access
   * @param config module config
   */
  constructor(
    private readonly store: Store<any>,
    @Optional() config?: QuangDialogConfig
  ) {
    if (config?.noLoaderUrls?.length) {
      this.noLoaderUrls = config.noLoaderUrls
    } else if (this._window().quangConfig?.noLoaderUrls) {
      this.noLoaderUrls = this._window().quangConfig?.noLoaderUrls
    } else {
      this.noLoaderUrls = []
    }
    if (config?.noLoaderMethods?.length) {
      this.noLoaderMethods = config.noLoaderMethods
    } else if (this._window().quangConfig?.noLoaderMethods) {
      this.noLoaderMethods = this._window().quangConfig?.noLoaderMethods
    } else {
      this.noLoaderMethods = []
    }
  }

  /**
   * check if the url of the call made and intercepted is present in one of the two lists
   * @param request http request
   */
  private readonly checkUrl = (request: HttpRequest<any>): boolean => {
    return (
      this.noLoaderUrls.some((url) => request.url.includes(url)) ||
      this.noLoaderMethods.some((method) => request.method === method)
    )
  }

  /**
   * intercept the call, check if the url should display the loader
   * @param request http request http request
   * @param next http observable
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const noLoader = this.checkUrl(request)
    if (!noLoader) {
      this.store.dispatch(LoaderActions.addLoader())
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => throwError(error)),
      finalize(() => {
        if (!noLoader) {
          this.store.dispatch(LoaderActions.removeLoader())
        }
      })
    )
  }
}
