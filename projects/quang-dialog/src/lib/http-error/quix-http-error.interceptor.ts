import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { QuixHttpErrorService } from './quix-http-error.service'

@Injectable()
export class QuixHttpErrorInterceptor implements HttpInterceptor {
  constructor (
    private quixHttpErrorService: QuixHttpErrorService
  ) {
  }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((resp: HttpEvent<any>) => {
        return resp
      }),
      catchError((error: HttpErrorResponse) => {
        this.quixHttpErrorService.openErrorModal(error)
        return throwError(error)
      })
    )
  }
}
