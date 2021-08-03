import { Injectable, Optional } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { addLoader, removeLoader } from './loader-store/loader.action'
import { QuangDialogConfig } from '../quang-dialog.config'

@Injectable({
  providedIn: 'root'
})
export class QuixLoaderInterceptor implements HttpInterceptor {
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

  constructor (
    private readonly store : Store<any>,
    @Optional() config?: QuangDialogConfig
  ) {
    if (config.noLoaderUrls?.length) {
      this.noLoaderUrls = config.noLoaderUrls
    } else if (this._window().quixConfig?.noLoaderUrls) {
      this.noLoaderUrls = this._window().quixConfig?.noLoaderUrls
    } else {
      this.noLoaderUrls = []
    }
    if (config.noLoaderMethods?.length) {
      this.noLoaderMethods = config.noLoaderMethods
    } else if (this._window().quixConfig?.noLoaderMethods) {
      this.noLoaderMethods = this._window().quixConfig?.noLoaderMethods
    } else {
      this.noLoaderMethods = []
    }
  }

  /**
   * check if the url of the call made and intercepted is present in one of the two lists
   * @param request
   */
  private checkUrl = (request: HttpRequest<any>): boolean => {
    return this.noLoaderUrls.some(url => request.url.includes(url)) || this.noLoaderMethods.some(method => request.method === method)
  }

  /**
   * intercept the call, check if the url should display the loader
   * @param request
   * @param next
   */
  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const noLoader = this.checkUrl(request)
    if (!noLoader) {
      this.store.dispatch(addLoader())
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => throwError(error)),
      finalize(() => {
        if (!noLoader) {
          this.store.dispatch(removeLoader())
        }
      })
    )
  }
}
