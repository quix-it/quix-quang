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
    return this.window.nativeWindow.authConfig?.apiTokenUrl.find(api => url.includes(api));
  };

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.checkUrl(req.url.toLowerCase())) {
      const headers = req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
      req = req.clone({headers});
    }
    return next.handle(req);
  }
}

