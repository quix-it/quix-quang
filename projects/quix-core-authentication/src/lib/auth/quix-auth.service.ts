import {Injectable, Optional} from '@angular/core';
import {NullValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {QuixWindowService} from '../window/quix-window.service';
import {QuixCoreAuthenticationModel} from '../quix-core-authentication.model';
import {UserState} from './store/user.reducer';
import {select, Store} from '@ngrx/store';
import {RoleState} from './store/role.reducer';
import {storeRoles} from './store/role.action';
import {userLogin} from './store/user.action';
import {Observable} from 'rxjs';
import {selectUser} from './store/user.selector';
import {haveRole, haveRoles, selectRoles} from './store/role.selector';

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
    @Optional() config: QuixCoreAuthenticationModel
  ) {
    if (config) {
      this.config = config;
    }
  }

  initAuth() {
    this.oauthService.configure(this.window.nativeWindow.authConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
      if (isLoggedIn) {
        this.oauthService.setupAutomaticSilentRefresh();
        if (this.config.storeUser) {
          this.storeUser();
        }
        if (this.config.storeRole) {
          this.storeRole();
        }
      }
    });
  }

  storeUser() {
    this.oauthService.loadUserProfile().then(
      (user: any) => {
        delete user.realm_access;
        this.userStore.dispatch(userLogin({userData: user}));
      }
    );
  }

  storeRole() {
    this.oauthService.loadUserProfile().then(
      (user: any) => {
        this.roleStore.dispatch(storeRoles({roleData: user.realm_access.roles}));
      }
    );
  }

  getUser() {
    return this.oauthService.loadUserProfile();
  }

  getStoredUser() {
    this.$user = this.userStore.pipe(select(selectUser));
    return this.$user;
  }

  getRoles() {
    this.$roles = this.roleStore.pipe(select(selectRoles));
    return this.$roles;
  }

  getStoredRoles() {
    return this.oauthService.loadUserProfile();
  }

  hasRole(role: string) {
    this.$hasRole = this.roleStore.pipe(select(haveRole, {roleId: role}));
  }

  hasRoles(roles: Array<string>) {
    this.$hasRole = this.roleStore.pipe(select(haveRoles, {roleIds: roles}));
  }
}
