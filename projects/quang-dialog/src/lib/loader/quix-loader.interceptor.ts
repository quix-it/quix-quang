import { Injectable } from '@angular/core'
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

function _window (): any {
  return window
}

@Injectable({
  providedIn: 'root'
})
export class QuixLoaderInterceptor implements HttpInterceptor {
  constructor (
    private store: Store<any>,
  ) {
  }

  private checkUrl = (request: HttpRequest<any>): boolean => {
    let found = 0
    found = _window().quixConfig?.noLoaderUrls.filter(url => request.url.indexOf(url) > 0).length
    found += _window().quixConfig?.noLoaderMethods.filter(method => request.method === method).length
    return !!found
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
