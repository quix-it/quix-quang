# Quang Auth

Quang Auth provides a comprehensive set of tools and utilities based on OIDC (Open ID Connect) for managing
authentication within your Angular application.

This service encapsulates authentication logic, making it reusable and maintainable across different parts of your
application.

To use this set be sure to have installed 'angular-oauth2-oidc' dependency.

## Directives

This section outlines the custom directives provided by the Quang Auth.

### QuangIsAuthenticatedDirective

This directive shows content only after user login.

To use it import [QuangIsAuthenticatedDirective](./directives/is-authenticated.directive.ts) and put it in your
template.

<h4 style="color:#657ED4">@example</h4>

```
<ng-container *quangIsAuthenticated>
    your HTML content here
</ng-container>
```

### QuangIsNotAuthenticatedDirective

This directive shows content only if user is not authenticated.

To use it import [QuangIsNotAuthenticatedDirective](./directives/is-not-authenticated.directive.ts) and put it in your
template.

<h4 style="color:#657ED4">@example</h4>

```
<ng-container *quangIsNotAuthenticated>
    your HTML content here
</ng-container>
```

### QuangHasEveryRoleDirective

This directive shows content only if the user has every specified role.

To use it import [QuangHasEveryRoleDirective](./directives/has-every-role.directive.ts) and put it in your template.

<h4 style="color:#657ED4">@example</h4>

```
<div *quangHasEveryRole="['admin', 'editor']">
    This content will only be visible to users with 'admin' and 'editor' roles.
</div>
```

### QuangHasAtLeastOneRoleDirective

This directive shows content only if the user has at least one of the specified roles.

To use it import [QuangHasAtLeastOneRoleDirective](./directives/has-at-least-one-role.directive.ts) and put it in your
template.

<h4 style="color:#657ED4">@example</h4>

```
<div *quangHasAtLeastOneRole="['admin', 'editor']">
    This content will only be visible to users with 'admin' or 'editor' roles.
</div>
```

## Guards

Guards are used to control access to routes in your Angular application. This section details the available guards for
protecting routes based on user authentication status.

### IsAllowedGuard

The `quangIsAllowedGuardFactory` allows access to route only if user has definited roles.

[quangIsAllowedGuardFactory](./guards/is-allowed.guard.ts)

<h4 style="color:#657ED4">@example</h4>

```
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components-test',
    pathMatch: 'full',
    canActivate: [quangIsAllowedGuardFactory(['adming', 'editor'], 'every')]
  },
  {
    path: '**',
    redirectTo: 'components-test',
  },
]
```

### IsAuthenticatedGuard

The `quangIsAuthenticatedGuard` allows access to route only if user is authenticated.

[quangIsAuthenticatedGuard](./guards/is-authenticated.guard.ts)

<h4 style="color:#657ED4">@example</h4>

```
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components-test',
    pathMatch: 'full',
    canActivate: [quangIsAuthenticatedGuard],
  },
  {
    path: '**',
    redirectTo: 'components-test',
  },
]
```

### Mobile

This section covers the mobile-specific functionalities offered by the Quang Auth service.

Function `withMobileAuth()` in [mobile-auth-feature.ts](./mobile/mobile-auth-feature.ts) return if auth is managed in a
mobile app.

### Auth Providers

[auth-providers.ts](./auth-providers.ts)

This section describes the configuration options for the Quang Auth service. It details the providers that need to be
registered in your Angular application's configuration (app.config.ts) to enable authentication functionality.

### Auth Service

[`QuangAuthService`](./auth.service.ts) provides a set of functions, models, and interfaces for interacting with the
authentication system. This section documents the available methods, data structures, and contracts for using the Auth
service effectively.

The service DOES NOT handle automatically the roles for the user. It's needed to call the `addRoles()` method to add
roles to the user after login.

```
userSubscription$ = toObservable(this.authService.user)
    .pipe(
        takeUntilDestroyed(),
        tap((u) => console.log('u ---->', u)),
        map((user) => user?.['info'].realm_access.roles as string[]), // customize with your actual handling of roles
        filter((roles) => roles.length > 0),
        tap((roles) => {
            this.authService.addRoles(roles)
        })
    )
.subscribe()
```

## ⚠️ Important Notice: Keycloak Version Upgrades

> **ATTENTION**: If you are using Keycloak as your authentication provider and planning to upgrade its version, please be aware that OIDC implementation in Keycloak is highly customized. Version upgrades may introduce breaking changes that could affect your authentication flow.

Always consult the [official Keycloak upgrade documentation](https://www.keycloak.org/docs/latest/upgrading/index.html) before performing any version upgrade to ensure compatibility with your application.

Testing your authentication flow thoroughly after upgrading Keycloak is strongly recommended to identify and address any potential issues.


