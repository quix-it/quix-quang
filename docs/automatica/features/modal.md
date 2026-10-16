# Modal

## Cosa fa

Apre una finestra sopra la pagina, con il resto bloccato dietro un fondale. La finestra ha tre zone —
intestazione, corpo e piede — e si può mettere al centro, a destra o a sinistra dello schermo, con
dimensione, colore, spaziatura e animazione di ingresso scelti da chi la apre.

Si usa in due modi, e sono due strade diverse:

- **In template**, mettendo il tag nel proprio HTML e decidendo con una condizione quando esiste. Il
  contenuto delle tre zone è scritto lì dentro.
- **Da codice**, chiedendo al servizio di aprire un componente qualunque dentro la finestra. Il
  servizio restituisce un identificativo e un `Observable` che emette quando quella finestra viene
  chiusa, con l'eventuale dato di ritorno: è il modo per far scegliere qualcosa all'utente e
  aspettare la risposta.

Nel secondo modo il componente aperto può chiudersi da sé, senza sapere chi lo ha aperto.

## Entry point

L'entry point secondario è `quang/overlay/modal` (`projects/quang/overlay/modal/index.ts`).

- `<quang-modal>` — `projects/quang/overlay/modal/modal.component.ts`. Input: `position`
  (obbligatorio, `'right' | 'left' | 'center'`), `height`, `width`, `padding`, `containerClass`,
  `animationMode`, `backgroundColor`, `showBackdrop`. Output `backdropClick`. Le tre zone sono
  `ng-content` selezionati sugli attributi `header`, `body` e `footer`.
- `QuangModalService` — `projects/quang/overlay/modal/modal.service.ts`, `providedIn: 'root'`:
  `showModal(component, options, componentInputs?)`, `close(id, data?)`, `hideModal(id?)`, i segnali
  `modalCount`, `hasOpenModals`, `modalIds` e l'`Observable` `modalClosed$`.
- `ModalRef` — `projects/quang/overlay/modal/modal-ref.ts`, iniettabile **solo** dentro un componente
  aperto dal servizio: `close(data?)` e `getId()`.
- `ModalOptions`, `ModalAnimationMode`, `ModalInstance` — `projects/quang/overlay/modal/models/`.

## Come funziona

### La finestra

Il componente non disegna niente nel punto in cui sta nel DOM: tutto il suo template è dentro un
`cdkPortal`, e in `ngAfterViewInit` crea un overlay del CDK e ci attacca il portale. Da lì la finestra
vive in cima al documento, fuori dall'albero del componente che l'ha dichiarata.

La posizione richiesta si traduce in una strategia globale del CDK — `right().top()`, `left().top()`
oppure centrata nelle due direzioni — e la strategia di scroll è `block()`, quindi mentre la finestra
è aperta la pagina dietro non scorre.

Dimensione, spaziatura e colore non sono stili diretti: diventano quattro variabili CSS sul
contenitore della finestra, e il foglio di stile del componente le legge. `containerClass` e la
classe dell'animazione sono concatenate nell'attributo `class` dello stesso contenitore.

Il fondale c'è sempre — `hasBackdrop: true` non è condizionato. `showBackdrop` agisce sulla sua
classe: a `false` la classe diventa la stringa vuota, cioè il fondale resta e cattura i clic ma non è
più dipinto. Il clic sul fondale non chiude niente da solo: emette `backdropClick`, e chi usa il
componente decide.

`ngOnDestroy` chiama la stessa `closeModal()` che fa `detach()` e `dispose()`, quindi togliere il tag
dalla pagina smonta anche l'overlay.

Delle cinque animazioni dichiarate, `SLIDE_TOP_TO_BOTTOM` non è raggiungibile: è registrato in
`../osservazioni.md`.

### Il servizio

`showModal` costruisce la finestra a mano, senza template:

1. Genera un identificativo (`modal-<contatore>-<timestamp>`).
2. Crea un `Injector` che porta due cose per il componente da mostrare: il suo identificativo sotto
   il token `MODAL_ID`, e `ModalRef`. È così che il componente aperto può chiudersi da solo
   iniettando `ModalRef` — ed è anche il motivo per cui `ModalRef` **non** è iniettabile altrove: il
   token dell'identificativo esiste solo in quell'injector.
3. Istanzia il componente di contenuto con quell'injector e, se gli sono stati passati degli input,
   li applica uno per uno con `setInput`.
4. Istanzia `QuangModalComponent` passando l'elemento del contenuto come **secondo** nodo
   proiettabile: intestazione e piede restano vuoti, il contenuto finisce nel corpo. Aperta dal
   servizio, la finestra ha quindi solo il corpo.
5. Riversa le opzioni sugli input della finestra, sottoscrive `backdropClick` a `close(id)` — qui il
   clic sul fondale **chiude**, a differenza dell'uso in template — attacca le due viste
   all'applicazione e appende l'elemento a `document.body`.

Il valore di ritorno è l'identificativo più l'`Observable` di un `Subject` tenuto nell'istanza: è
quello che emette il dato di chiusura.

### La chiusura e il dato di ritorno

`close(id, data)` cerca l'istanza, emette `data` sul suo `Subject`, lo completa e poi delega a
`hideModal(id)`. `hideModal` senza argomento chiude invece l'ultima aperta — le istanze sono una
lista e si scarta dalla coda.

`hideModal` emette `undefined` sul `Subject` prima di distruggere, così una chiusura che non passa da
`close` — il fondale in template, la chiusura dell'ultima finestra senza identificativo — fa comunque
arrivare un valore a chi stava aspettando. Chi si sottoscrive riceve quindi sempre un'emissione: il
dato se c'è, `undefined` altrimenti.

La distruzione fa i passi in ordine inverso all'apertura: `closeModal()` sulla finestra per smontare
l'overlay, `detachView` delle due viste, rimozione dall'elemento padre, `destroy()` dei due
riferimenti. Alla fine `modalClosed$` emette l'identificativo, per chi vuole sapere delle chiusure
senza avere in mano la singola finestra.

Un identificativo che non corrisponde a nessuna istanza non è un errore: il servizio scrive un avviso
in console e non fa altro.

## Dipende da

- **Base degli overlay** (`condivisi/base-overlay.md`) — solo per il foglio di stile globale
  `global-overlay.scss`, che l'applicazione deve includere perché l'overlay del CDK abbia le proprie
  regole di posizionamento. Il modal **non** usa la direttiva base degli overlay: popover e tooltip
  sì, questa feature parla con il CDK per conto proprio.

Confini esterni: `@angular/cdk/overlay` per l'overlay e le strategie di posizionamento e di scroll,
`@angular/cdk/portal` per il portale del template, `rxjs` per i `Subject` di chiusura.
