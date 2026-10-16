# Osservazione del ridimensionamento

## Cosa fa

Un servizio che dice quando un elemento del DOM cambia dimensione, sotto forma di `Observable`. Chi
lo usa passa l'elemento e si sottoscrive; a ogni ridimensionamento riceve la misura, con un limite
di frequenza già applicato.

Ci sono due livelli: uno restituisce l'entry completa del `ResizeObserver` del browser, l'altro solo
la larghezza, che è il caso comune.

Nella libreria lo usa la tabella, per ricopiare le larghezze delle colonne dall'intestazione nascosta
a quella fissa quando l'utente ridimensiona la finestra.

## Entry point

- `projects/quang/device/index.ts` — l'entry point secondario `quang/device`.
- `ResizeObservableService`, `providedIn: 'root'`: una sola istanza per applicazione, senza bisogno
  di dichiararla fra i provider.
- `resizeObservable(elem: Element): Observable<ResizeObserverEntry>` — l'entry del browser, filtrata
  su quell'elemento.
- `widthResizeObservable(elem: Element): Observable<number>` — la sola larghezza del border box.

## Come funziona

Il servizio ha **un solo `ResizeObserver`** per tutta l'applicazione, creato nel costruttore, e una
lista di notificatori (`notifiers`) a cui inoltra.

Il callback dell'osservatore non instrada: prende l'array di entries che il browser gli passa e lo
gira **intero a ogni notificatore della lista**, senza guardare quale elemento sia cambiato. Lo
smistamento avviene a valle, nella pipe che ogni chiamante riceve: un `map` cerca dentro l'array
l'entry il cui `target` è l'elemento richiesto, e `filter(Boolean)` scarta il caso in cui non ci sia.
Ne segue che ogni ridimensionamento di qualunque elemento osservato attraversa la pipe di ogni
sottoscrittore, e la maggior parte delle volte viene scartato lì.

`resizeObservable` chiama `observe(elem)` **quando il metodo viene invocato**, prima di costruire
l'`Observable` e quindi indipendentemente dalla sottoscrizione. La registrazione nella lista dei
notificatori, invece, avviene alla sottoscrizione. Le due cose non sono simmetriche: chiamare il
metodo e non sottoscriversi lascia l'elemento osservato senza che esista un teardown da eseguire per
smettere.

Il teardown, quando c'è, fa due cose: toglie il proprio subscriber dalla lista e chiama
`unobserve(elem)`. La seconda è per elemento, non per sottoscrittore — l'osservatore è uno solo e non
tiene il conto di quante sottoscrizioni riguardino lo stesso elemento.

L'ultimo stadio della pipe è `throttleTime(30)`: al massimo un evento ogni 30 ms per sottoscrizione,
applicato **dopo** il filtro, quindi il limite conta solo gli eventi che riguardano quell'elemento.

`widthResizeObservable` aggiunge due passi sopra il primo metodo: legge `borderBoxSize[0].inlineSize`
— la larghezza del border box, non del content box — e passa il risultato per un altro
`filter(Boolean)`. Quest'ultimo scarta lo zero: quando l'elemento si riduce a larghezza nulla, per
esempio perché viene nascosto, il valore non viene emesso e il sottoscrittore resta sull'ultima
larghezza utile.

Il lato tabella mostra il ciclo di vita atteso: prima di sottoscriversi disfa la sottoscrizione
precedente, se c'è, e lega la nuova a `takeUntilDestroyed` (`table.component.ts:200`). Ogni
ricalcolo passa quindi da un `unobserve` e da un `observe` sullo stesso elemento.

## Dipende da

Nessun condiviso della libreria: quest'area non importa niente da dentro `projects/quang/`.

Confini esterni:

- `rxjs` — `Observable` costruito a mano con il suo `Subscriber`, più `map`, `filter` e
  `throttleTime`.
- `ResizeObserver` del browser, usato direttamente. Il servizio lo istanzia nel costruttore, quindi
  in un ambiente dove quel global non esiste l'istanziazione del servizio stesso fallisce; lo spec
  del servizio verifica solo che la classe sia definita e lascia il resto a un TODO.
