# Base degli overlay

## Cosa fa

Tiene il meccanismo con cui popover e tooltip compaiono: si attaccano a un elemento della pagina, si
aprono al clic o al passaggio del mouse, si posizionano su uno degli otto lati chiesti e ripiegano
sul lato opposto quando lo spazio non basta, si chiudono al clic fuori o dopo un certo numero di
pixel di scroll.

Porta anche il foglio di stile globale che l'overlay di Angular CDK richiede per funzionare, e una
sostituzione del misuratore della finestra del CDK scritta per i telefoni con la barra degli
indirizzi che si nasconde.

Non ha un ingresso proprio per chi usa la libreria: le direttive `[quangPopover]` e `[quangTooltip]`
sono gli ingressi, e stanno nelle rispettive feature.

## Entry point

Nessuno verso l'esterno. L'area è pubblicata come entry point secondario `quang/overlay/shared` e da
lì popover e tooltip importano:

- `projects/quang/overlay/shared/quang-base-overlay.directive.ts` —
  `QuangBaseOverlayDirective<T, TContent, TPayload>`, direttiva astratta. La estendono
  `QuangPopoverDirective` e `QuangTooltipDirective`.
- `projects/quang/overlay/shared/quang-base-overlay.component.ts` —
  `QuangBaseOverlayComponent<TContent, TPayload>`, la forma del componente che viene mostrato dentro
  l'overlay.
- `projects/quang/overlay/shared/CustomViewportRuler.ts` — `CustomViewportRuler`, servizio
  registrato in root.

`projects/quang/overlay/global-overlay.scss` non è codice: è una riga che importa il CSS
precompilato dell'overlay del CDK, e va inclusa nel foglio di stile dell'applicazione. Senza,
l'overlay viene creato ma non ha le regole di posizionamento e appare nel posto sbagliato.

## Come funziona

### L'apertura

La direttiva base non dichiara quale componente mostrare: lo tiene in un segnale
`targetComponentType` che vale `undefined`, e ogni direttiva concreta lo sovrascrive con il proprio.
Se non lo facesse, `attachOverlay` esce subito senza fare niente. Lo stesso vale per l'input
`content`, dichiarato qui come richiesto e ridichiarato dalle direttive concrete con l'alias che
diventa il nome dell'attributo in template — `[quangPopover]`, `[quangTooltip]`. È il modo in cui la
stessa base serve due direttive con due nomi diversi.

Il modo di apertura è un input, e i tre ascoltatori sull'elemento ospite si spartiscono i casi: il
clic apre e richiude alternando, il passaggio del mouse apre alternando ma l'uscita del mouse
**chiude sempre**. La differenza conta: in modo `hover` un secondo passaggio sull'elemento mentre
l'overlay è ancora aperto lo chiude invece di lasciarlo aperto.

Alla creazione dell'overlay la strategia di scroll è scelta sull'input `scrollCloseThreshold`: un
numero significa «chiudi dopo tanti pixel di scroll», e passare esplicitamente `undefined` significa
«non chiudere mai allo scroll». Il default è 100 pixel, quindi un overlay che deve restare aperto
durante lo scroll richiede di passare `undefined` a mano.

Il fondale esiste solo in modo `click`, e la sua classe è impostata alla stringa vuota: sostituisce
la classe di default del CDK con niente, quindi il fondale è **invisibile ma presente**. Cattura il
clic fuori — che è ciò che chiude l'overlay — e con esso il primo clic che l'utente fa altrove nella
pagina, che serve a chiudere e non arriva a destinazione.

### Come il contenuto arriva nel componente

L'overlay viene creato con un `ComponentPortal` e, subito dopo averlo attaccato, la base **assegna
il contenuto direttamente sulle proprietà dell'istanza**: `istanza.overlayContent = this.content` e
`istanza.payload = this.quangOverlayPayload`. Quello che passa non è il valore, è il segnale stesso
della direttiva: la proprietà del componente viene sostituita con il segnale del padre, così che
leggerla nel template del componente legga il valore che la direttiva ha ricevuto.

Non è il percorso normale degli input di Angular — non passa da `setComponentInput`, non applica
trasformazioni e non segna il componente da ricontrollare — e funziona perché il componente mostrato
dichiara quelle due proprietà come normali proprietà di segnale. Per la stessa ragione popover e
tooltip **implementano** `QuangBaseOverlayComponent` invece di estenderla: `implements` su una classe
astratta obbliga a ridichiarare ogni membro, e infatti entrambi ridichiarano `overlayContent`,
`payload` e `positionPair`. Il vincolo `input.required` dichiarato nella base non li raggiunge, e il
popover dichiara il proprio `overlayContent` come opzionale con default `null`.

### Il posizionamento

Le otto posizioni sono altrettante coppie di ancoraggio, e la posizione chiesta si traduce in una
lista di **due** posizioni: quella voluta e il suo opposto. Il CDK prova la prima e ripiega sulla
seconda quando non c'è spazio. Le quattro posizioni con `-left` e `-right` portano uno scostamento
orizzontale fisso di 40 pixel, le altre solo uno scostamento verticale di 8.

Quando il CDK ripiega, la coppia effettivamente usata viene scritta nel segnale `positionPair` del
componente mostrato: è il modo in cui il componente sa da che lato è finito, e il popover lo usa per
mettere la freccia dalla parte giusta.

### La chiusura

`detachOverlay` fa `detach()` e subito `dispose()`, quindi ogni chiusura distrugge l'overlay e la
riapertura ne crea uno nuovo dal principio. Il riferimento non viene azzerato, ma un riferimento
distrutto risponde «non attaccato» alla domanda che decide se aprire o chiudere, quindi
l'alternanza continua a funzionare. La distruzione della direttiva chiude l'overlay.

### Il misuratore della finestra

`CustomViewportRuler` è una copia del `ViewportRuler` del CDK con una sola differenza di sostanza:
misura la finestra con `documentElement.clientWidth/clientHeight` invece delle proprietà della
finestra, perché sui telefoni con la barra degli indirizzi che si nasconde le seconde riportano una
dimensione che non corrisponde a quello che si vede. Registra i propri ascoltatori di `resize` e
`orientationchange` fuori dalla zona di Angular, e la misura è tenuta in cache e invalidata a ogni
cambiamento.

Serve solo se viene fornito **al posto** di `ViewportRuler` nei provider dell'applicazione, come dice
il commento sopra la classe: la libreria lo esporta e non lo fornisce, quindi il comportamento di
default resta quello del CDK.

## Dipende da

Nessun altro condiviso di questo repo.

Confini esterni: `@angular/cdk/overlay` per la creazione e il posizionamento dell'overlay,
`@angular/cdk/portal` per il portale del componente, `@angular/cdk/platform` e
`@angular/cdk/scrolling` per il misuratore della finestra.
