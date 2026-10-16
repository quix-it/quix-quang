# Tooltip

## Cosa fa

Mostra un breve testo accanto a un elemento della pagina quando il mouse ci passa sopra, o al clic se
chi lo usa lo chiede. Il contenuto è solo testo: per un riquadro con bottoni o parti di form c'è il
popover.

Oltre a essere usato direttamente dalle applicazioni, è il modo in cui i componenti di form della
libreria mostrano il loro messaggio di aiuto.

## Entry point

L'entry point secondario è `quang/overlay/tooltip` (`projects/quang/overlay/tooltip/index.ts`), che
esporta la direttiva e il componente.

- `[quangTooltip]` — `projects/quang/overlay/tooltip/tooltip.directive.ts`. Il valore dell'attributo è
  la stringa da mostrare.
- Gli altri input arrivano dalla direttiva base e valgono qui: `overlayPosition` (uno degli otto lati,
  default `top`), `showMethod` (`click` o `hover`, ma qui **default `hover`**), `scrollCloseThreshold`
  (pixel di scroll dopo i quali chiudere, default 100), `quangOverlayPayload`.

## Come funziona

Come per il popover, apertura, posizionamento, fondale e chiusura stanno tutti nella base degli
overlay. Questa feature aggiunge tre cose.

**La direttiva dichiara il componente, il nome dell'attributo e un default diverso.** Sovrascrive
`targetComponentType` con `QuangTooltipComponent`, ridichiara `content` come stringa richiesta con
l'alias `quangTooltip`, e ridichiara `showMethod` con default `hover` dove la base ha `click`. Con
`hover` la base non crea il fondale, quindi il tooltip non intercetta il clic sul resto della pagina.

**Una stringa vuota non disegna niente.** Il template del componente mostra il testo dentro un `@if`
sul contenuto: un tooltip con contenuto vuoto apre comunque l'overlay, ma l'overlay non contiene
niente di visibile. I chiamanti della libreria ci contano: il chip dell'autocomplete passa la stringa
vuota quando non è impostata una lunghezza massima dei chip, per avere il tooltip solo quando i chip
possono essere accorciati.

**La comparsa è animata.** Il riquadro entra con una dissolvenza di 200 ms dichiarata con
`@angular/animations`. Il foglio di stile parte da `opacity: 0` e lo stato dell'animazione porta
l'opacità a 1. Colori di sfondo e testo sono le variabili `--bs-body-color` e `--bs-body-bg` invertite
di Bootstrap.

Il componente **implementa** `QuangBaseOverlayComponent` invece di estenderla, e ridichiara
`overlayContent`, `payload` e `positionPair`: il motivo sta in `condivisi/base-overlay.md`. Il
`positionPair` viene scritto dalla base ma questo componente non lo legge, perché il tooltip non ha
freccia.

Il componente dichiara anche un input `quangTooltipPosition`, che non è letto dal suo template né
assegnato dalla base: la posizione la decide `overlayPosition` sulla direttiva.

### Uso dai componenti di form

I componenti che estendono la base dei componenti mettono la direttiva su un contenitore attorno
all'icona di aiuto, quando c'è un `helpMessage` e `helpMessageTooltip` è vero. Il messaggio passa
dalla pipe `transloco` prima di arrivare al tooltip, e posizione e modo di apertura vengono dagli input
`helpTooltipPosition` e `showHelpTooltipMethod` del componente di form.

## Dipende da

- **Base degli overlay** (`condivisi/base-overlay.md`) — `QuangBaseOverlayDirective` per tutto il
  ciclo di apertura, posizionamento e chiusura, `QuangBaseOverlayComponent` per la forma del
  componente mostrato, e il foglio di stile globale `global-overlay.scss` che l'applicazione deve
  includere.

Confini esterni: `@angular/animations` per la dissolvenza, `@angular/cdk/overlay` per il tipo della
coppia di posizione, `@angular/cdk/portal` per il tipo del componente da attaccare.
