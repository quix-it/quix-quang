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
  noLoaderUrls: string[] = []
  noLoaderMethods: string[] = []
  _window = (): any => window

  constructor (
    private store: Store<any>,
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

  private checkUrl = (request: HttpRequest<any>): boolean => {
    return this.noLoaderUrls.some(url => request.url.includes(url)) || this.noLoaderMethods.some(method => request.method === method)
  }

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
