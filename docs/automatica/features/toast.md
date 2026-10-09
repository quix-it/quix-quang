# Toast

## Cosa fa

Mostra una notifica a comparsa in un punto fisso dello schermo — uno dei quattro angoli, il centro, o
il centro del bordo alto o basso — che si chiude da sola dopo un tempo scelto da chi la apre, o prima
con il bottone di chiusura.

La notifica è di tre tipi, successo, avviso ed errore, e il tipo si vede da un quadratino colorato
accanto al titolo. Al posto del quadratino si può mettere un'icona propria, e l'intestazione si può
nascondere del tutto. Il corpo può essere un testo, un template dell'applicazione, o tutti e due.

Si apre da codice, con una chiamata a un servizio, non dichiarandola in un template: l'applicazione
mette il componente una volta sola, di solito nel componente radice, e da lì ogni parte del codice
può aprire una notifica.

## Entry point

L'entry point secondario è `quang/overlay/toast` (`projects/quang/overlay/toast/index.ts`), che esporta
il servizio e il componente.

- `QuangToastService.openToast(toastData)` — `projects/quang/overlay/toast/toast.service.ts`.
  Registrato in root: non va fornito.
- `QuangToastService.closeToast()` — stesso file, chiude la notifica corrente.
- `<quang-toast>` — `projects/quang/overlay/toast/toast.component.ts`. Il punto in cui la notifica
  viene disegnata. Senza, `openToast` aggiorna lo stato del servizio e non compare niente.

`ToastData`, l'oggetto passato a `openToast`, sta nel file del servizio. `type`, `position` e
`timing` sono obbligatori; gli altri campi sono opzionali.

## Come funziona

**Una notifica alla volta.** Il servizio tiene un solo segnale `currentToast`, e `openToast` lo
sovrascrive: una notifica aperta mentre un'altra è visibile la **sostituisce**, non le si affianca.
Nello stesso passo il servizio cancella il timer di chiusura della notifica precedente e ne avvia uno
nuovo con il `timing` della nuova, quindi la durata riparte da capo.

Il contatore `count` del servizio sale a ogni apertura e torna indietro subito quando supera uno: in
pratica vale 0 o 1, e `isShowing` è `count > 0`. `closeToast` cancella il timer, azzera la notifica
corrente e porta il contatore a zero senza scendere sotto.

**Il componente è un contenitore sempre presente.** Il template non è dentro un `@if`: il `div` della
notifica esiste anche quando non c'è niente da mostrare, e la visibilità passa dalle classi `show` e
`hide` di Bootstrap legate a `isShowing`, con la classe `fade` sempre presente. La posizione e il tipo
diventano classi CSS sullo stesso `div`; il foglio di stile del componente ha una regola
`position: fixed` per ognuna delle sette posizioni, e i colori dei tre tipi per il quadratino.

Poiché la chiusura azzera `currentToast` nello stesso momento in cui `isShowing` diventa falso, il
contenuto della notifica sparisce subito e solo il contenitore vuoto segue la transizione di uscita.

**I testi passano dalle traduzioni.** Il titolo è passato alla pipe `transloco`, e anche il testo del
corpo, con `textValue` come parametro dell'interpolazione: chi apre la notifica passa una chiave di
traduzione, e un valore variabile da inserirci dentro. Il testo e il valore vengono ripuliti dagli
spazi in testa e in coda prima della traduzione. La data, se c'è, è formattata con la pipe `date` e il
formato `dateFormat`.

**Il template personalizzato** è disegnato in coda al corpo con `ngTemplateOutlet`, senza contesto.

**`showAtLeastFor` non ha effetto sulla visibilità.** Il componente lo usa per costruire il segnale
`showToast`, che ritarda il passaggio a «nascosta» del `timing` della notifica corrente o, se non ce
n'è, di `showAtLeastFor`. Il template però non legge `showToast`: le classi di visibilità seguono
`isShowing` direttamente.

## Dipende da

Nessun condiviso di questo repo: il componente non usa la base degli overlay. Importa `OverlayModule`
del CDK, ma il template non ne usa nessuna direttiva: la posizione è CSS fisso.

Confini esterni: `@ngrx/signals` per lo stato del servizio, `@jsverse/transloco` per la pipe di
traduzione, le classi `toast`, `toast-header`, `toast-body`, `btn-close`, `fade`, `show` e `hide` di
Bootstrap, che l'applicazione deve includere.
