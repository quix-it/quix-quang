# Autenticazione

## Cosa fa

Porta in un'applicazione Angular un login OpenID Connect completo: avvia il flusso verso l'identity
provider, tiene i token, espone lo stato di autenticazione e i ruoli dell'utente come signal, e mette
a disposizione guardie di rotta e direttive strutturali per mostrare o nascondere pezzi di interfaccia
in base ai ruoli.

Chi la usa non la attiva da sola: la passa a `provideQuangConfig` come feature, scegliendo con altre
funzioni `with*` dove tenere i token (session, local, memoria), se girare dentro un'app Capacitor, e
se sloggare in automatico su certi codici di errore HTTP.

## Entry point

- `projects/quang/auth/auth-providers.ts` — `provideAuth(authConfig?, ...features)` e `withAuth(...)`,
  la forma da passare a `provideQuangConfig`.
- `projects/quang/auth/auth.service.ts` — `QuangAuthService`, iniettabile ovunque: `login()`,
  `logout()`, `isAuthenticated()`, `roles()`, `user()`, `tokenStatus`, `getUserProfile()`,
  `addRoles()` / `removeRoles()`.
- `projects/quang/auth/guards/` — `quangIsAuthenticatedGuard` e
  `quangIsAllowedGuardFactory(roles, 'every' | 'atLeastOne')`, da mettere nei `canActivate` delle
  rotte.
- `projects/quang/auth/directives/` — `*quangIsAuthenticated`, `*quangIsNotAuthenticated`,
  `*quangHasEveryRole="[...]"`, `*quangHasAtLeastOneRole="[...]"`.
- `projects/quang/auth/logout-on-error.interceptor.ts` — `logoutOnErrorInterceptor` e
  `withLogoutOnError(excludedUrls, statuses, retries)`.
- `projects/quang/auth/token-storage/` — `withSessionStorage()`, `withLocalStorage()`,
  `withMemoryStorage()`.
- `projects/quang/auth/mobile/mobile-auth-feature.ts` — `withMobileAuth(toolbarColor,
  presentationStyle)`, entry point secondario a sé (`quang/auth/mobile`).

## Come funziona

`provideAuth` registra la configurazione sul token `AUTH_CONFIG`, configura `angular-oauth2-oidc`
passandogli `sendAccessToken` e `urlsToSendToken`, aggiunge i provider delle feature scelte, e
infine registra un app initializer che chiama `QuangAuthService.init()`. L'ordine conta: le feature
di storage entrano prima dell'initializer, così quando `init()` gira il token store è già quello
scelto.

`QuangAuthService` tiene tutto in un `signalState` di `@ngrx/signals` con quattro parti — stato del
login, token, ruoli, profilo utente. Nel costruttore:

- se `AUTH_CONFIG` manca, **lancia** `Missing auth config`: il servizio è `providedIn: 'root'`, quindi
  iniettarlo senza aver chiamato `provideAuth` fa fallire l'applicazione;
- se il token `OPEN_URI` è presente, ne sovrascrive `openUri` nella config — è così che la feature
  mobile dirotta il flusso sul browser in-app di Capacitor;
- si iscrive agli eventi di `OAuthService`: un `OAuthErrorEvent` provoca il logout **solo se il primo
  controllo di login è già avvenuto**, e un `token_received` ricopia i token nello stato.

`init()` avvia il refresh silenzioso automatico, carica il discovery document tentando il login,
chiama `checkForAuthentication()`, e solo alla fine — se `autoLogin` è attivo e non si è autenticati —
manda l'utente all'identity provider.

`checkForAuthentication(forceRefresh)` è il punto in cui si concentrano le regole:

- il refresh sceglie la strada in base al `responseType` della config: `refreshToken()` quando è
  `'code'`, `silentRefresh()` in ogni altro caso;
- se il refresh fallisce con un `reason` fra quelli che richiedono l'intervento dell'utente
  (`interaction_required`, `login_required`, `account_selection_required`, `consent_required`) e
  `autoLogin` è attivo, riparte il login invece di limitarsi a segnalare l'errore;
- `checked: true` viene scritto **sempre**, anche quando il controllo è fallito. È ciò che sblocca
  `waitForLoginCheck()`, e quindi le guardie: senza quella scrittura incondizionata una rotta
  protetta resterebbe appesa dopo un errore di autenticazione.

Le guardie non leggono `isAuthenticated()` direttamente: chiamano `getAuthResult()`, che aspetta
`loginChecked` prima di rispondere. È il vincolo di sequenza che evita di rimbalzare l'utente al
login solo perché la rotta è stata valutata prima della fine di `init()`.

`quangIsAllowedGuardFactory` sceglie fra `hasEveryRole` e `hasAtLeastOneRole` e la invoca con
`.call(authService, roles)`: la funzione viene estratta dal servizio, quindi il `this` va ripassato a
mano.

Le quattro direttive strutturali sono un `effect()` che crea o svuota la view. `*quangIsAuthenticated`
e `*quangIsNotAuthenticated` guardano `isAuthenticated()`; le due sui ruoli chiamano il metodo
corrispondente del servizio, e in modalità verbose scrivono in console ruoli dell'utente e ruoli
richiesti. Non sono un controllo di sicurezza: nascondono l'interfaccia, mentre a proteggere i dati
restano guardie e server.

`logoutOnErrorInterceptor` è **registrato a mano**, non da `withLogoutOnError`: quest'ultima fornisce
solo i tre token di configurazione (statuses, url escluse, numero di tentativi), e l'interceptor va
aggiunto in `provideHttpClient(withInterceptors([...]))`. Passa oltre le richieste il cui metodo non
è fra i cinque riconosciuti, e quelle la cui url corrisponde a una esclusione registrata per quel
metodo. Sulle altre applica un `retry` (4 tentativi, 300 ms) e, se lo stato è fra quelli di logout
(401 di default), rilancia `checkForAuthentication(true)`: se nemmeno il refresh forzato autentica,
chiama `logout()`. L'errore viene comunque rilanciato al chiamante. C'è un **secondo** `retry` in
coda alla catena, con un tentativo e 500 ms, che rimette in gioco l'intera pipeline — inclusi i primi
quattro tentativi e il controllo di autenticazione — una volta di più.

Le tre feature di storage assegnano il token `OAuthStorage` della libreria OIDC: `localStorage`,
`sessionStorage`, o la classe `MemoryStorage` di questo repo, che è una `Map` in memoria e restituisce
stringa vuota per le chiavi assenti. Sceglierne più d'una non è un errore di compilazione: vince
l'ultima registrata.

`withMobileAuth` è attiva solo dentro Capacitor. Fornisce un `OPEN_URI` che apre il browser in-app
invece di navigare, e su iOS ricarica la pagina quando l'utente lo chiude. In più, all'avvio, ascolta
due eventi dell'app nativa dentro `NgZone.run`: `appUrlOpen`, da cui estrae la query string del
redirect e la rimette sulla root (`/?<query>`) perché il flusso OIDC possa concluderlo, e `resume`,
su cui richiama `init()`.

## Dipende da

- `Utility per interceptor` (`projects/quang/shared/`) — `logoutOnErrorInterceptor` ne usa
  `isHttpMethod` e `getExcludedUrlsByMethod` per la lista di esclusione. Vedi
  `docs/automatica/condivisi/utility-interceptor.md`.
- `Configurazione Quang` (`projects/quang/index.ts`) — per `QUANG_LOGGING_BEHAVIOR`, letto dal
  servizio e dalle due direttive sui ruoli, e per l'aggancio come feature.

Confini esterni: `angular-oauth2-oidc` fa il protocollo OIDC e possiede i token; `@ngrx/signals`
regge lo stato; `@capacitor/app`, `@capacitor/browser` e `@capacitor/core` per la sola feature mobile.
