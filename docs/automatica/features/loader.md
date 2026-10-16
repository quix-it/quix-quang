# Loader

## Cosa fa

Mostra un indicatore di caricamento mentre ci sono chiamate HTTP in corso, senza che le pagine debbano
occuparsene. Chi usa la libreria mette il componente una volta sola nel guscio dell'applicazione e
registra l'interceptor: da lì in avanti ogni richiesta accende l'indicatore e il suo completamento lo
spegne.

Si può escludere un elenco di url dal conteggio — tipicamente il caricamento degli asset o un
polling — perché non facciano comparire l'indicatore.

Il contatore è anche pilotabile a mano, per un caricamento che non è una chiamata HTTP.

## Entry point

L'entry point secondario è `quang/loader` (`projects/quang/loader/index.ts`).

- `<quang-loader></quang-loader>` — `projects/quang/loader/loader.component.ts`. Senza contenuto
  proiettato disegna lo spinner di default; con del contenuto dentro il tag disegna quello.
  Input `showAtLeastFor`, millisecondi, default 500.
- `quangLoaderInterceptor` — `projects/quang/loader/loader.interceptor.ts`, da passare a
  `provideHttpClient(withInterceptors([...]))`. Non si registra da solo.
- `withLoaderExcludedUrls([...])` e `provideQuangLoaderExcludedUrls([...])` —
  `projects/quang/loader/loader-providers.ts`, l'elenco degli url esclusi. `provideLoader` è lo
  stesso simbolo, deprecato.
- `QuangLoaderService` — `projects/quang/loader/loader.service.ts`, `providedIn: 'root'`, con
  `show()`, `hide()` e il segnale `isLoading`.

## Come funziona

### Il contatore

Lo stato è un contatore, non un booleano: `show()` incrementa, `hide()` decrementa, e `isLoading` è
`count > 0`. Serve perché più richieste sovrapposte accendono e spengono lo stesso indicatore, e
l'ultima che finisce deve poterlo spegnere senza che le altre lo spengano prima.

Il contatore non ha un pavimento a zero. Un `hide()` in più di quanti `show()` siano stati fatti —
possibile solo chiamando il servizio a mano — lo porta in negativo, e da lì una richiesta successiva
non basta più a riportarlo sopra lo zero.

### L'interceptor

Prima di decidere guarda il metodo della richiesta: se non è uno dei cinque metodi previsti lascia
passare senza toccare il contatore. Poi confronta l'url con quelli esclusi per quel metodo; se
combacia, di nuovo lascia passare.

Altrimenti chiama `show()` e mette un `finalize` sulla risposta: il decremento avviene alla fine
comunque vada, sia su esito positivo sia su errore sia se chi ha chiesto annulla la sottoscrizione.

Il raggruppamento degli url esclusi per metodo arriva dall'utility condivisa degli interceptor, non
è scritto qui.

Il confronto dell'url non è un confronto: `request.url.match(...)` tratta l'url escluso come
espressione regolare, quindi l'esclusione combacia anche in mezzo all'url e i caratteri speciali
dell'espressione restano attivi. È registrato in `../osservazioni.md`.

### Il ritardo dello spegnimento

Il componente non legge `isLoading` direttamente: lo fa passare per una pipe che lascia passare
subito il passaggio a «in caricamento» e **ritarda** di `showAtLeastFor` millisecondi il passaggio a
«fermo». Un `switchAll` scarta il ritardo in corso se nel frattempo riparte una richiesta, così una
sequenza di chiamate ravvicinate non fa lampeggiare l'indicatore.

Il ritardo è aggiunto alla fine di ogni caricamento, non è un tempo minimo di permanenza: una
richiesta che dura cinque secondi tiene l'indicatore acceso cinque secondi più mezzo. È registrato in
`../osservazioni.md`.

### Lo spinner di default e il contenuto proiettato

Il template avvolge il contenuto proiettato in un `div` con riferimento di template e decide se
disegnare lo spinner di default guardando quanti figli quel `div` ha nel DOM: nessun figlio significa
che nessuno ha proiettato niente, e allora lo spinner ci vuole. È una lettura del DOM dentro
un'espressione di template, non un input.

## Dipende da

- **Utility per interceptor** (`condivisi/utility-interceptor.md`) — `getExcludedUrlsByMethod`,
  `isHttpMethod` e il tipo `UrlData`.
- **Configurazione Quang** (`features/configurazione-quang.md`) — `withLoaderExcludedUrls` è una
  feature nel senso di `quangFeature`, e viene composta insieme alle altre nella configurazione.

Confini esterni: `@angular/common/http` per l'interceptor, `@ngrx/signals` per lo stato del
contatore, `rxjs` per il ritardo dello spegnimento.
