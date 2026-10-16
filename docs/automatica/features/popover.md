# Popover

## Cosa fa

Attacca a un elemento della pagina un riquadro che compare al clic o al passaggio del mouse e
contiene quello che si vuole: testo, bottoni, un pezzo di form. A differenza del tooltip il contenuto
è interattivo, perché è un pezzo di template dell'applicazione, non una stringa.

Chi lo usa scrive il contenuto in un `ng-template` e lo passa alla direttiva. Può anche passare un
dato, che arriva al template come contesto: è il modo per riusare lo stesso riquadro su più elementi
di una lista mostrando ogni volta il dato della riga.

Il riquadro porta una freccia, e la freccia si mette dal lato giusto anche quando il riquadro ripiega
sul lato opposto perché non c'era spazio.

## Entry point

L'entry point secondario è `quang/overlay/popover` (`projects/quang/overlay/popover/index.ts`), che
esporta **solo la direttiva**: il componente del riquadro è un dettaglio interno e non si usa dal di
fuori.

- `[quangPopover]` — `projects/quang/overlay/popover/popover.directive.ts`. Il valore dell'attributo è
  il `TemplateRef` da mostrare.
- Gli altri input arrivano dalla direttiva base e valgono qui: `overlayPosition` (uno degli otto lati,
  default `top`), `showMethod` (`click` o `hover`, default `click`), `scrollCloseThreshold` (pixel di
  scroll dopo i quali chiudere, default 100, `undefined` per non chiudere mai),
  `quangOverlayPayload` (il dato per il contesto del template).

## Come funziona

Questa feature aggiunge poco: apertura, posizionamento, fondale e chiusura stanno tutti nella base
degli overlay. Quello che è suo sono tre cose.

**La direttiva dichiara il componente da mostrare e il nome dell'attributo.** Sovrascrive
`targetComponentType` con `QuangPopoverComponent` e ridichiara l'input `content` con l'alias
`quangPopover`: è il minimo che la base richiede, e non c'è altro nel file.

**Il componente rende un template, non un testo.** Riceve il `TemplateRef` in `overlayContent` e lo
disegna con `ngTemplateOutlet`, passando il payload come `$implicit` del contesto — nel template di
chi usa la direttiva si legge quindi con `let-qualcosa`. Se il contenuto è nullo il componente non
disegna niente: il riquadro esiste come overlay ma è vuoto.

Al contrario della base, che dichiara `overlayContent` come input richiesto, qui è dichiarato
opzionale con default `null`. Il vincolo non si eredita perché il componente **implementa** la classe
base invece di estenderla — il motivo sta in `condivisi/base-overlay.md`.

**La freccia segue il lato scelto dal CDK.** Il componente tiene un segnale `positionPair` che la
base riempie con la coppia di ancoraggio effettivamente usata, e da lì deriva una classe CSS
`<originX>-<originY>` — `center-bottom`, `start-top`, `end-center` e così via, otto in tutto, tutte
presenti nel foglio di stile. La classe finisce sul contenitore del riquadro e il CSS disegna la
freccia dal lato corrispondente. È per questo che il riquadro resta corretto anche quando il CDK
ripiega sul lato opposto a quello chiesto: la classe viene dalla posizione reale, non dall'input.

La derivazione è una sottoscrizione scritta nell'inizializzatore del campo, non un `computed`: legge
il segnale come `Observable` e scrive in un secondo segnale. Il risultato è lo stesso, ma la classe è
uno stato scritto e non un valore derivato.

## Dipende da

- **Base degli overlay** (`condivisi/base-overlay.md`) — `QuangBaseOverlayDirective` per tutto il
  ciclo di apertura, posizionamento e chiusura, `QuangBaseOverlayComponent` per la forma del
  componente mostrato, e il foglio di stile globale `global-overlay.scss` che l'applicazione deve
  includere.

Confini esterni: `@angular/cdk/overlay` per il tipo della coppia di posizione,
`@angular/cdk/portal` per il tipo del componente da attaccare.
