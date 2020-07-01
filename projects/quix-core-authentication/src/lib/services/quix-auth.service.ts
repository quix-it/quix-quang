import {Injectable, Optional} from '@angular/core';
import {QuixAuthModel} from "../quix-auth.model";
import {Store} from "@ngrx/store";
import {NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {from, of} from "rxjs";
import {userInfoLogout, userLogout} from "../store/user.action";
import {TranslateService} from "@ngx-translate/core";
import {QuixWindowService} from "../window/quix-window.service";
import {QuixStorageService} from "../storage/quix-storage.service";

@Injectable({
  providedIn: 'root'
})
export class QuixAuthService {
  public config: QuixAuthModel

  constructor(
    @Optional() config: QuixAuthModel,
    private oauthService: OAuthService,
    private window: QuixWindowService,
    private translate: TranslateService,
    private quixStorage: QuixStorageService,
    private authStore: Store<any>,
  ) {
    if (config) {
      this.config = config;
    }
  }


  startAuth() {
    if (this.window.nativeWindow.authConfig) {
      this.oauthService.configure(this.window.nativeWindow.authConfig);
    } else if (this.config.oidcConfig) {
      this.oauthService.configure(this.config.oidcConfig);
    } else {
      alert('[AUTH SERVICE] No auth config')
    }
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    return from(this.oauthService.loadDiscoveryDocumentAndLogin())

  }

  initUserInfo() {
    this.oauthService.setupAutomaticSilentRefresh();
    if (this.config.storeUser) {
      return from(this.oauthService.loadUserProfile())
    } else {
      return of(null)
    }
  }

  logOut() {
    this.authStore.dispatch(userLogout())
    this.authStore.dispatch(userInfoLogout())
    this.oauthService.logOut();
  }

  initLanguageAndLocale(userLang: string) {
    if (this.config.initLocale) {
      if (this.quixStorage.getLocal('locale') !== userLang) {
        this.quixStorage.setLocal('locale', userLang)
        location.reload()
      }
      if (this.config.defaultLanguage === 'browser') {
        this.translate.setDefaultLang(navigator.language.slice(0, 2))
      } else {
        this.translate.setDefaultLang(this.config.defaultLanguage)
      }
      if (userLang) {
        this.translate.use(userLang)
      }
    }
    return of(true)
  }
}
