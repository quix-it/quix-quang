import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';

import {Store} from "@ngrx/store";
import {addLoader, removeLoader} from "./loader-store/loader.action";
import {QuixWindowService} from "../window/quix-window.service";
import {QuixCoreComponentsState} from "../quix-core-components.reducers";

@Injectable({
  providedIn: 'root'
})
export class QuixLoaderInterceptor implements HttpInterceptor {
  constructor(private store: Store<QuixCoreComponentsState>,
              private window: QuixWindowService) {
  }

  private checkUrl = (request: HttpRequest<any>): boolean => {
    let found = 0
    found = this.window.nativeWindow.quixConfig?.noLoaderUrls.filter(url => request.url.indexOf(url) > 0).length
    found += this.window.nativeWindow.quixConfig?.noLoaderMethods.filter(method => request.method === method).length
    if (this.window.nativeWindow.quixConfig?.loaderJWTMode && !localStorage.getItem('access_token')) {
      found++
    }
    return !!found
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const noLoader = this.checkUrl(request);
    if (!noLoader) {
      this.store.dispatch(addLoader());
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => throwError(error)),
      finalize(() => {
        if (!noLoader) {
          this.store.dispatch(removeLoader());
        }
      })
    );
  }
}
