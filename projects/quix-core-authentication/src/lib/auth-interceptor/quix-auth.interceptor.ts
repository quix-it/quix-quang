import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QuixWindowService} from '../window/quix-window.service';



@Injectable()
export class QuixAuthInterceptor implements HttpInterceptor {
  constructor(
    private window: QuixWindowService,
  ) {
  }

  private checkUrl = function(url) {
    function urlTest(apiUrl) {
      return url.indexOf(apiUrl) >= 0;
    }
    const find = this.window.nativeWindow.authConfig.apiBaseUrl.find(urlTest);
    return find;
  };

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.checkUrl(req.url.toLowerCase())) {
      const headers = req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
      req = req.clone({headers});
    }
    return next.handle(req);
  }
}

