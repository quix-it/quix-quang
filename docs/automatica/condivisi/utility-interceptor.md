# Utility per interceptor

## Cosa fa

Risponde a una domanda sola, che due interceptor della libreria si fanno allo stesso modo: «questa
richiesta HTTP va saltata?». Chi configura la libreria dichiara una lista di url da escludere, ognuno
con il suo metodo HTTP, e questa area la trasforma nella forma con cui gli interceptor la
interrogano richiesta per richiesta.

Non ha un ingresso proprio per chi usa la libreria: non si mette in un template, non si inietta e non
si configura. È il pezzo comune ai due interceptor.

## Entry point

Nessuno verso l'esterno. L'area è pubblicata come entry point secondario `quang/shared` e da lì
importano il loader e l'autenticazione:

- `projects/quang/shared/intercept-utils.ts` — tre cose:
  - `UrlData`, la coppia `{ url, method }` con cui si dichiara un'esclusione. È il tipo dei token
    `LOADER_EXCLUDED_URLS` e `LOGOUT_EXCLUDED_URLS`, e degli argomenti di
    `withLoaderExcludedUrls`, `provideQuangLoaderExcludedUrls` e `withLogoutOnError`.
  - `HttpMethod` con la sua guardia `isHttpMethod`, che riconosce cinque metodi: `GET`, `POST`,
    `PUT`, `DELETE`, `PATCH`.
  - `getExcludedUrlsByMethod(urlData)`, che raggruppa le esclusioni per metodo.

I due punti che la usano sono `projects/quang/loader/loader.interceptor.ts` e
`projects/quang/auth/logout-on-error.interceptor.ts`. `projects/quang/loader/loader-providers.ts`
importa il solo tipo `UrlData`.

## Come funziona

`getExcludedUrlsByMethod` restituisce una mappa che ha **sempre tutte e cinque le chiavi**, ognuna
con il proprio insieme di url, anche vuoto. È questo che permette agli interceptor di chiedere
l'insieme del metodo della richiesta senza controllare prima se esiste. Un'esclusione dichiarata
senza metodo finisce fra le `GET`.

Il resto sta negli interceptor, e i due lo fanno con lo stesso codice, ricopiato:

1. Se il metodo della richiesta non è uno dei cinque riconosciuti, la richiesta passa e
   **l'interceptor non fa niente**. Una `HEAD` o una `OPTIONS` quindi non accende il loader e non
   viene sorvegliata dal logout su errore, indipendentemente da come sono configurate le esclusioni.
2. Altrimenti l'url escluso viene confrontato con quello della richiesta tramite `match`, cioè
   **come espressione regolare e non come stringa**. Il confronto non è ancorato: un'esclusione vale
   per ogni url che la contenga come sottostringa. Le barre vengono precedute da un backslash prima
   del confronto, gli altri caratteri speciali delle espressioni regolari no.
3. Se una delle esclusioni del metodo corrisponde, la richiesta passa senza che l'interceptor
   intervenga.

Nessuno dei due token di esclusione è obbligatorio: iniettati opzionalmente, se assenti valgono lista
vuota, e allora nessuna richiesta è esclusa.

Cosa fa ciascun interceptor sulle richieste **non** escluse non appartiene a quest'area: il loader
alza e abbassa il proprio indicatore, l'autenticazione ritenta e decide se disconnettere. Sono
descritti nelle rispettive schede.

## Dipende da

Nessun altro condiviso di questo repo.

Confini esterni: `@angular/common/http` per il tipo dell'interceptor.

Chi la usa: `Loader` (`projects/quang/loader/`) e `Autenticazione` (`projects/quang/auth/`). Vedi
`docs/automatica/features/loader.md` e `docs/automatica/features/autenticazione.md`.
