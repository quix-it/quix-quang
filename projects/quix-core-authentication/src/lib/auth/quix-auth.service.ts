import {Injectable, Optional} from '@angular/core';
import {NullValidationHandler, OAuthService, UserInfo} from 'angular-oauth2-oidc';
import {QuixWindowService} from '../window/quix-window.service';
import {QuixCoreAuthenticationModel} from '../quix-core-authentication.model';
import {UserState} from './store/user.reducer';
import {select, Store} from '@ngrx/store';
import {RoleState} from './store/role.reducer';
import {storeRoles} from './store/role.action';
import {userLogin} from './store/user.action';
import {from, Observable} from 'rxjs';
import {selectUser} from './store/user.selector';
import {haveRole, haveRoles, selectRoles} from './store/role.selector';
import {TranslateService} from "@ngx-translate/core";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuixAuthService {
  public config: QuixCoreAuthenticationModel;
  public $user: Observable<any>;
  public $roles: Observable<any>;
  public $hasRole: Observable<any>;

  constructor(
    private oauthService: OAuthService,
    private window: QuixWindowService,
    private roleStore: Store<RoleState>,
    private userStore: Store<UserState>,
    private translate: TranslateService,
    @Optional() config: QuixCoreAuthenticationModel
  ) {
    if (config) {
      this.config = config;
    }
  }

  initAuth() {
    if (this.window.nativeWindow.authConfig) {
      this.oauthService.configure(this.window.nativeWindow.authConfig);
      this.startAuth()
    } else if (this.config.oidcConfig) {
      this.oauthService.configure(this.config.oidcConfig);
      this.startAuth()
    } else {
      alert('Insert auth config');
    }
  }

  private startAuth() {
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    from(this.oauthService.loadDiscoveryDocumentAndLogin())
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.oauthService.setupAutomaticSilentRefresh();
          this.initUserInfo()
        }
      });
  }

  private initUserInfo() {
    from(this.oauthService.loadUserProfile())
      .subscribe(
        (user: UserInfo) => {
          if (this.config.storeRole) {
            this.roleStore.dispatch(storeRoles({roleData: user.realm_access?.roles}));
          }
          if (this.config.storeUser) {
            delete user.realm_access
            this.userStore.dispatch(userLogin({userData: user}));
          }
          if (this.config.initStoreLocale) {
            this.initStoreLocale(user)
          }
          if (this.config.initStoreLanguage) {
            this.initStoreLanguage(user)
          }
        }
      );
  }

  logOut() {
    this.oauthService.logOut();
  }

  getUserInfo() {
    return this.oauthService.loadUserProfile();
  }

  getStoredUser() {
    this.$user = this.userStore.pipe(select(selectUser));
    return this.$user;
  }

  getStoredRoles() {
    this.$roles = this.roleStore.pipe(select(selectRoles));
    return this.$roles;
  }

  hasStoredRole(role: string) {
    this.$hasRole = this.roleStore.pipe(select(haveRole, {roleId: role}));
    return this.$hasRole
  }

  hasStoredRoles(roles: Array<string>) {
    this.$hasRole = this.roleStore.pipe(select(haveRoles, {roleIds: roles}));
    return this.$hasRole
  }


  private initStoreLocale(user: UserInfo) {
    // recuperare il locale corrente dal localstorage poi controllar ese è uguale al nuov o nel caso reload dell'app'
    // this.getStoredUser().subscribe(
    //   (user: any) => {
    //     if (user.locale) {
    //       this.translate.use(user.locale);
    //     }
    //   }
    // )
  }

  private initStoreLanguage(user: UserInfo) {
    // this.translate.use(lang)
    // this.getStoredUser().subscribe(
    //   (user: any) => {
    //     if (user.locale) {
    //       this.translate.use(user.locale);
    //     }
    //   }
    // )
  }
}
