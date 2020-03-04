import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {QuixLoaderService} from './quix-loader.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class QuixLoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: QuixLoaderService) {
  }

  private checkUrl = (request: HttpRequest<any>): boolean => {
    return request.url.indexOf('/token') < 0 || !localStorage.getItem('access_token');
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const activateLoader = this.checkUrl(request);
    if (activateLoader) {
      this.loaderService.addLoader();
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (activateLoader) {
            this.loaderService.subLoader();
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (activateLoader) {
          this.loaderService.subLoader();
        }
        return throwError(error);
      })
    );
  }
}
