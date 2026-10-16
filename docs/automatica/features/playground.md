# Playground

## Cosa fa

È l'applicazione dimostrativa della libreria: un sito in cui ogni area di `quang` ha una pagina che
la mostra in funzione, con il codice da copiare e il README dell'area. Serve a chi sviluppa la
libreria per provare un componente a mano, e a chi la usa per vedere gli esempi prima di
importarla. Non è pubblicata con il pacchetto.

Il menu in alto porta alle pagine; a destra ci sono la versione, la scelta della lingua (inglese o
italiano) e la scelta del tema (chiaro o scuro). Lingua e tema sopravvivono al ricaricamento.

## Entry point

- Avvio: `projects/playground/src/main.ts`, che monta `AppComponent` con la configurazione di
  `projects/playground/src/app/app.config.ts` e la rilevazione delle modifiche senza zone.
- Rotte: `projects/playground/src/app/app.routes.ts`. Le aree sono caricate in modo pigro:
  - `''` — home, `pages/home/`;
  - `components/<nome>` e, per alcuni, `components/<nome>/test` — `pages/components-test-pages/`
    (autocomplete, date, input, paginator, select, radio-group, table, tabs, toggle, wysiwyg,
    loader). Un sottopath sconosciuto ripiega su `components/input`;
  - `overlay/<nome>` — `pages/overlay-test-pages/` (tooltip, popover, modal, modal-service,
    toast). Ripiego su `overlay/tooltip`;
  - `auth/auth` — `pages/auth-test-pages/`;
  - `form/validators`, `form/example`, `form/test` — `pages/form/`. Ripiego su `form/validators`;
  - `data-handling`, `device`, `network`, `translation` — una pagina ciascuna sotto `pages/`;
  - ogni altro url torna alla home.
- Menu: `projects/playground/src/app/core/menu/`, con le voci dichiarate in `menuList.ts`.
- Script npm (in `package.json`): `start:playground`, `build:playground` e `deploy:git`, tutti
  preceduti da `copy-readme`.

## Come funziona

### La configurazione è un consumo reale della libreria

`app.config.ts` registra la libreria come la registrerebbe un progetto: `provideQuangConfig` con
`withTranslation` (italiano e inglese, inglese di default), `withLoaderExcludedUrls` che esclude
dal loader le `GET` verso `assets`, e `withAuth` puntato al server dimostrativo pubblico di Duende
(`https://demo.duendesoftware.com`, client `interactive.public`, code flow con PKCE, login non
automatico, token in session storage, logout su 401, 402 e 403). Gli interceptor
`quangLoaderInterceptor` e `logoutOnErrorInterceptor` sono passati a `provideHttpClient`.

Il `baseHref` passato a Quang è letto a runtime dal tag `<base>` del documento, così la stessa
build funziona servita da `/` e da `/quix-quang/` (il path con cui la pubblica `deploy:git`).

Il guscio (`app.component.html`) mette una volta sola `<quang-toast>` e `<quang-loader>` sotto il
`router-outlet`: tutte le pagine li condividono.

### Lingua e tema

All'avvio `AppComponent` legge `theme` e `language` da `localStorage`, con `light` ed `en` come
valori di ripiego, e li applica.

La lingua passa da `QuangTranslationService.setActiveLang`; il menu la cambia ricavandola dall'ultima
parte della chiave della voce (`menu.language.it` → `it`) e la salva in `localStorage`. Le
traduzioni stanno in `src/assets/i18n/en.json` e `it.json`, con le stesse chiavi nei due file.

Il tema non è un insieme di classi ma un foglio di stile intero. La build produce due bundle,
`light` (iniettato nella pagina) e `dark` (non iniettato), da `src/sass/styles-light.scss` e
`styles-dark.scss`. `ThemeService` aggiunge al `<head>` un `<link>` suo e, a ogni cambio, ne punta
l'`href` a `light.css` o `dark.css`, imposta `data-bs-theme` e la classe sul `<body>` e salva la
scelta. Il prefisso dell'`href` è il token `DEPLOY_URL`, opzionale: nessuno lo fornisce, quindi il
foglio è risolto relativo alla pagina. La modale del tema (`core/theme-modal/`) è costruita con
`quang-modal`.

### Il menu

Le voci sono dati (`menuList.ts`): una voce con `route` naviga, una con `children` apre un
sottomenu in un overlay CDK agganciato alla voce. Il sottomenu si apre al passaggio del mouse e si
chiude 500 ms dopo che il mouse è uscito, a meno che nel frattempo non sia entrato nel sottomenu.
La versione mostrata è il campo `version` del `package.json` di root, importato a build time.

### Due tipi di pagina per i componenti

Le pagine dei componenti seguono uno di due schemi, e alcuni componenti li hanno entrambi.

- **Showcase** (`components/<nome>`): una serie di esempi indipendenti, ognuno un componente sotto
  `examples/` che esporta insieme il componente e due stringhe, `<NOME>_TS` e `<NOME>_HTML`, con il
  codice da mostrare. Le stringhe sono scritte a mano accanto al componente e non derivano dal suo
  template. `playground-example-viewer` (`shared/components/example-viewer/`) mostra l'esempio
  vivo in una linguetta e il codice, evidenziato con Prism, nelle altre due, con il tasto di copia.
- **Test** (`components/<nome>/test`, e le pagine che non hanno showcase): un banco unico con
  interruttori che cambiano gli input del componente in diretta. L'istanza principale porta la
  direttiva `playgroundSourceCode` (`shared/directives/source-code.directive.ts`), che alla
  costruzione copia l'`outerHTML` dell'elemento nell'attributo `data-source`; la pagina lo rilegge
  e lo passa alla documentazione come esempio d'uso.

### La documentazione del componente

`playground-component-documentation` (`shared/components/component-documentation/`) riceve la
classe del componente e mostra fino a tre blocchi:

1. **Il README dell'area**, in Markdown via `ngx-markdown`. Ogni pagina gli passa il path
   esplicito, scelto in base alla lingua attiva. Il blocco compare solo se il file viene scaricato.
2. **L'esempio d'uso**, cioè l'`outerHTML` raccolto dalla direttiva, ripulito degli attributi che
   Angular aggiunge in esecuzione (`_ngcontent`, `_nghost`, `ng-reflect-*`, `id`) e copiabile.
3. **Input e output**, ricavati per riflessione dai metadati compilati del componente
   (`ɵcmp.inputs` e `ɵcmp.outputs`), con due ripieghi sul prototipo e sui decoratori.

Con `readmeOnly` resta solo il primo blocco: è il caso delle showcase e della home.

### Da dove arrivano i README

I README non stanno negli asset versionati: li produce `scripts/copy-readme.js`, che `start`,
`build` e `deploy` del playground eseguono prima di Angular. Lo script copia ogni file il cui nome
contiene `readme` sotto `projects/quang/` in `projects/playground/src/assets/docs/` (ignorata da
git), rinominato `<cartella><suffisso>.md`: `components/date/README-it.md` diventa `date-it.md`,
`overlay/modal/README-service.md` diventa `modal-service.md`. Il README di root della libreria
diventa `root-readme.md` (con i link delle sezioni riscritti in rotte del playground) e
`root-readme-it.md`; la home li mostra in base alla lingua.

Le pagine showcase di autocomplete, date, radio-group, select, tabs e toggle, e la pagina test di
radio-group, chiedono in italiano `<nome>.it.md` invece di `<nome>-it.md`: lo script non produce
quel nome, quindi in italiano quelle pagine non mostrano il README. È registrato in
`../osservazioni.md`.

### Le pagine senza componenti

`data-handling`, `device`, `network` e `translation` non hanno un banco interattivo: elencano le
funzioni dell'area, ognuna con l'import, un esempio e una spiegazione tradotta, e un tasto che
copia import ed esempio insieme. Le stringhe di import mostrate puntano a file interni
dell'area (per esempio `quang/device/resize-observable.service`), non all'entry point pubblicato;
è registrato in `../osservazioni.md`.

La pagina `auth` ha i tasti di login e logout, mostra l'utente corrente del servizio di
autenticazione, aggiunge e toglie a mano due ruoli di prova e chiama un'API protetta del server
dimostrativo, il cui esito finisce solo in console. La pagina del
loader genera traffico vero: venti richieste in sequenza verso `jsonplaceholder.typicode.com`, una
`GET` riuscita e una che risponde 401 verso `httpbin.org`, quest'ultima per vedere scattare il
logout su errore.

### Codice non raggiungibile

`pages/orders/` contiene due componenti vuoti e un file di rotte che nessuna rotta carica: non è
raggiungibile dall'applicazione. È registrato in `../osservazioni.md`.

## Dipende da

Il playground non ha condivisi propri: consuma la libreria dagli entry point pubblici, come un
progetto esterno. Ogni pagina rimanda al comportamento descritto nella scheda della feature che
mostra — per esempio [Loader](loader.md), [Autenticazione](autenticazione.md),
[Traduzioni](traduzioni.md), [Configurazione Quang](configurazione-quang.md).

Confini esterni: il server OIDC dimostrativo di Duende, `httpbin.org` e
`jsonplaceholder.typicode.com`, chiamati dalle pagine di autenticazione e del loader.
