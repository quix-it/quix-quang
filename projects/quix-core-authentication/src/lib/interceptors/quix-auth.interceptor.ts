import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {QuixWindowService} from "../window/quix-window.service";
import {QuixAuthModel} from "../quix-auth.model";

@Injectable()
export class QuixAuthInterceptor implements HttpInterceptor {
  config: QuixAuthModel
  constructor(
    private window: QuixWindowService,
    @Optional() config: QuixAuthModel,
  ) {
    if (config) {
      this.config = config;
    }
  }

  private checkUrl = function(url) {
    if (this.window.nativeWindow.authConfig) {
      return this.window.nativeWindow.authConfig?.apiTokenUrl.find(api => url.includes(api));
    } else if (this.config.oidcConfig) {
      return this.config.authConfig?.apiTokenUrl.find(api => url.includes(api));
    } else {
      alert('[AUTH INTERCEPTOR] No auth config')
    }

  };

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.checkUrl(req.url.toLowerCase())) {
      const headers = req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
      req = req.clone({headers});
    }
    return next.handle(req);
  }
}

