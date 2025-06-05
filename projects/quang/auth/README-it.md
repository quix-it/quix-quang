# Quang Auth

Quang Auth fornisce un set completo di strumenti e utility basati su OIDC (Open ID Connect) per la gestione
dell'autenticazione all'interno della tua applicazione Angular.

Questo servizio incapsula la logica di autenticazione, rendendola riutilizzabile e manutenibile in diverse parti della tua applicazione.

Per utilizzare questo set assicurati di aver installato la dipendenza 'angular-oauth2-oidc'.

## Direttive

Questa sezione descrive le direttive personalizzate fornite da Quang Auth.

### QuangIsAuthenticatedDirective

Questa direttiva mostra il contenuto solo dopo il login dell'utente.

Per usarla importa [QuangIsAuthenticatedDirective](./directives/is-authenticated.directive.ts) e inseriscila nel tuo template.

<h4 style="color:#657ED4">@esempio</h4>

```
<ng-container *quangIsAuthenticated>
    il tuo contenuto HTML qui
</ng-container>
```

### QuangIsNotAuthenticatedDirective

Questa direttiva mostra il contenuto solo se l'utente non è autenticato.

Per usarla importa [QuangIsNotAuthenticatedDirective](./directives/is-not-authenticated.directive.ts) e inseriscila nel tuo template.

<h4 style="color:#657ED4">@esempio</h4>

```
<ng-container *quangIsNotAuthenticated>
    il tuo contenuto HTML qui
</ng-container>
```

### QuangHasEveryRoleDirective

Questa direttiva mostra il contenuto solo se l'utente possiede tutti i ruoli specificati.

Per usarla importa [QuangHasEveryRoleDirective](./directives/has-every-role.directive.ts) e inseriscila nel tuo template.

<h4 style="color:#657ED4">@esempio</h4>

```
<div *quangHasEveryRole="['admin', 'editor']">
    Questo contenuto sarà visibile solo agli utenti con i ruoli 'admin' e 'editor'.
</div>
```

### QuangHasAtLeastOneRoleDirective

Questa direttiva mostra il contenuto solo se l'utente possiede almeno uno dei ruoli specificati.

Per usarla importa [QuangHasAtLeastOneRoleDirective](./directives/has-at-least-one-role.directive.ts) e inseriscila nel tuo template.

<h4 style="color:#657ED4">@esempio</h4>

```
<div *quangHasAtLeastOneRole="['admin', 'editor']">
    Questo contenuto sarà visibile solo agli utenti con ruolo 'admin' o 'editor'.
</div>
```

## Guardie

Le guardie vengono utilizzate per controllare l'accesso alle rotte nella tua applicazione Angular. Questa sezione descrive le guardie disponibili per proteggere le rotte in base allo stato di autenticazione dell'utente.

### IsAllowedGuard

La `quangIsAllowedGuardFactory` consente l'accesso alla rotta solo se l'utente ha i ruoli definiti.

[quangIsAllowedGuardFactory](./guards/is-allowed.guard.ts)

<h4 style="color:#657ED4">@esempio</h4>

```
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components-test',
    pathMatch: 'full',
    canActivate: [quangIsAllowedGuardFactory(['admin', 'editor'], 'every')]
  },
  {
    path: '**',
    redirectTo: 'components-test',
  },
]
```

### IsAuthenticatedGuard

La `quangIsAuthenticatedGuard` consente l'accesso alla rotta solo se l'utente è autenticato.

[quangIsAuthenticatedGuard](./guards/is-authenticated.guard.ts)

<h4 style="color:#657ED4">@esempio</h4>

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

Questa sezione copre le funzionalità specifiche per mobile offerte dal servizio Quang Auth.

La funzione `withMobileAuth()` in [mobile-auth-feature.ts](./mobile/mobile-auth-feature.ts) restituisce se l'autenticazione è gestita in una app mobile.

### Auth Providers

[auth-providers.ts](./auth-providers.ts)

Questa sezione descrive le opzioni di configurazione per il servizio Quang Auth. Dettaglia i provider che devono essere registrati nella configurazione della tua applicazione Angular (app.config.ts) per abilitare la funzionalità di autenticazione.

### Auth Service

[`QuangAuthService`](./auth.service.ts) fornisce una serie di funzioni, modelli e interfacce per interagire con il sistema di autenticazione. Questa sezione documenta i metodi disponibili, le strutture dati e i contratti per utilizzare efficacemente il servizio Auth.

Il servizio NON gestisce automaticamente i ruoli dell'utente. È necessario chiamare il metodo `addRoles()` per aggiungere i ruoli all'utente dopo il login.

```
userSubscription$ = toObservable(this.authService.user)
    .pipe(
        takeUntilDestroyed(),
        tap((u) => console.log('u ---->', u)),
        map((user) => user?.['info'].realm_access.roles as string[]), // personalizza in base alla tua gestione dei ruoli
        filter((roles) => roles.length > 0),
        tap((roles) => {
            this.authService.addRoles(roles)
        })
    )
.subscribe()
```

## ⚠️ Avviso Importante: Aggiornamenti di Versione Keycloak

> **ATTENZIONE**: Se utilizzi Keycloak come provider di autenticazione e prevedi di aggiornarne la versione, tieni presente che l'implementazione OIDC in Keycloak è altamente personalizzata. Gli aggiornamenti di versione possono introdurre breaking changes che potrebbero influire sul tuo flusso di autenticazione.

Consulta sempre la [documentazione ufficiale di upgrade di Keycloak](https://www.keycloak.org/docs/latest/upgrading/index.html) prima di eseguire qualsiasi aggiornamento di versione per garantire la compatibilità con la tua applicazione.

Si consiglia vivamente di testare accuratamente il flusso di autenticazione dopo l'aggiornamento di Keycloak per identificare e risolvere eventuali problemi.
