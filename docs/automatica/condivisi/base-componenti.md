# Base dei componenti

## Cosa fa

Tiene, in un posto solo, tutto ciò che ogni campo di form della libreria fa allo stesso modo:
leggere e scrivere il valore nel form Angular, sapere se è obbligatorio, disabilitato, toccato,
valido, scegliere quale messaggio di errore mostrare, generare un id quando chi lo usa non lo passa.
I componenti di campo ereditano da qui e scrivono solo ciò che li distingue.

Ospita anche la lista delle opzioni a tendina, il pannello che select e autocomplete aprono sotto al
campo: la stessa lista, la stessa navigazione da tastiera e lo stesso posizionamento per entrambi.

Non ha un ingresso proprio per chi usa la libreria: non si mette in un template e non si chiama. È
la base da cui i componenti di campo partono.

## Entry point

Nessuno verso l'esterno. L'area è pubblicata come entry point secondario
`quang/components/shared` e da lì i componenti della libreria importano:

- `projects/quang/components/shared/quang-base-component.directive.ts` — `QuangBaseComponent<T>`,
  direttiva astratta. La estendono otto componenti: input, checkbox, radio group, select,
  autocomplete, date, tabs, wysiwyg.
- `projects/quang/components/shared/option-list/option-list.component.ts` —
  `QuangOptionListComponent`, il pannello `<quang-option-list>`, usato da select e autocomplete.
- `projects/quang/components/shared/makeId.ts` — `makeId(length)`, dieci caratteri casuali fra
  lettere e cifre. Lo usa la base per il default di `componentId`, e il paginator direttamente:
  è l'unica cosa che il paginator prende da qui, perché non estende la base.
- `projects/quang/components/shared/ErrorData.ts` — `ErrorData`, la coppia `{ error, message }` con
  cui chi usa un campo dichiara i messaggi da mostrare.
- `projects/quang/components/shared/sass/_input-search.scss` — foglio di stile della casella di
  ricerca, incluso dai componenti che ne mostrano una.

## Come funziona

### Il valore e il controllo di form

`QuangBaseComponent` implementa `ControlValueAccessor`, ma **non è lei a registrarsi presso il
form**: ogni componente concreto dichiara il proprio provider `NG_VALUE_ACCESSOR` con
`useExisting`. La base fornisce i metodi, il componente fornisce la registrazione.

Il controllo di form su cui la base lavora **non arriva da un input**: lo prende dall'injector con
`this._injector().get(NgControl)`, dentro `setupFormControl`. L'input `formControl` esiste, ma il
suo valore non viene mai letto: serve solo come segnale che fa rieseguire `setupFormControl` quando
cambia. Chi passa un `FormControl` diverso da quello legato in template non cambia il controllo su
cui il componente lavora.

`setupFormControl` gira due volte nel ciclo di vita normale — da `ngAfterViewInit` e dalla
sottoscrizione all'input `formControl` — e per questo comincia disfacendo il proprio lavoro
precedente: annulla le tre sottoscrizioni che aveva aperto prima di riaprirle. Senza quel passo
ogni riesecuzione moltiplicherebbe i ricalcoli degli errori.

Le sottoscrizioni sono tre, e la terza è quella che non si deduce. Due sono `statusChanges` e
`valueChanges` del controllo. La terza è lo stream `events` di Angular, e c'è perché
`markAllAsTouched()` — quello che chiama chi valida un form intero al momento dell'invio — cambia
lo stato di toccato **senza** emettere su `statusChanges`: senza ascoltare `events` un campo
obbligatorio vuoto non mostrerebbe l'errore dopo un invio, ma solo dopo essere stato toccato a mano.

### Quale errore viene mostrato

`checkFormErrors` scorre gli errori del controllo e cerca ognuno nella mappa `errorMap` che chi usa
il campo ha dichiarato. Il ciclo non si interrompe al primo che trova: **l'ultimo errore presente
nella mappa vince**. Con un controllo che ha due errori insieme, e la mappa che li nomina
entrambi, il messaggio mostrato dipende dall'ordine con cui Angular ha inserito le chiavi
nell'oggetto degli errori, non da un ordine di priorità dichiarabile.

Errore e messaggio finiscono in due segnali (`_currentErrorMessage` e
`_currentErrorMessageExtraData`), e il secondo porta il dato dell'errore sotto la sua chiave: è
quello che permette a un messaggio di interpolare, per esempio, la lunghezza minima richiesta.

Il messaggio di errore compare solo se **tutte** queste cose valgono insieme: `errorMap` non è
vuota, il controllo non è valido, è toccato, non è disabilitato. Un campo senza `errorMap` non
mostra nessun errore anche quando il controllo è invalido — l'assenza della mappa non è un default,
è un silenzio. Il messaggio di successo ha la condizione simmetrica.

### Obbligatorio, disabilitato, toccato

L'asterisco sull'etichetta non arriva da un input: la base guarda se il controllo ha
`Validators.required` o `Validators.requiredTrue`, e lo fa in due posti che rispondono alla stessa
domanda — il segnale `_isRequired`, scritto a ogni ricalcolo degli errori, e il calcolato
`getIsRequiredControl`, che i template leggono per l'attributo HTML `required`.

Lo stato disabilitato ha **due sorgenti che si sommano**: il controllo di form disabilitato, e
l'input `isReadonly`. Cambiare `isReadonly` ricalcola il disabilitato tenendo conto del controllo, e
`setDisabledState` — quello che chiama Angular quando il form disabilita il campo — lo sovrascrive
senza guardare `isReadonly`. L'ordine fra i due conta: un `disable()` sul controllo dopo che
`isReadonly` è già vero lascia il campo disabilitato, il contrario no.

Lo stato di toccato è ricalcolato come `touched || dirty`: per questa base un campo modificato è un
campo toccato, anche se Angular tiene le due cose distinte.

### Il trim

L'input `trim` agisce **solo al blur e solo su valori stringa**, mai durante la digitazione, e
propaga il valore ripulito passando dal normale percorso di cambiamento — quindi il form riceve un
secondo evento di modifica dopo che l'utente ha lasciato il campo.

### La lista delle opzioni

`QuangOptionListComponent` è un pannello che si posiziona da sé rispetto al campo che l'ha aperto,
ricevuto come `selectButtonRef`. Il verso lo decide misurando: se fra il fondo del campo e il fondo
della finestra ci sta l'altezza della lista, si apre sotto, altrimenti sopra. Il calcolo viene
rifatto allo scroll della finestra, allo scroll del primo antenato scrollabile e a ogni
ridimensionamento del pannello, che è osservato con un `ResizeObserver`.

Fino a quando la posizione non è stata calcolata almeno una volta il pannello è tenuto
`visibility: hidden`: senza quel passo la prima pittura avverrebbe nella posizione di default e si
vedrebbe un salto dall'alto verso il basso, soprattutto con il campo vicino al bordo superiore
della pagina.

La navigazione da tastiera è un unico ascoltatore su `document` in fase di **capture**, riaperto ogni
volta che il pannello si apre e chiuso prima di riaprirlo. Le frecce muovono un indice tenuto nella
chiusura dell'effect e spostano la classe `selected` da un elemento all'altro toccando il DOM
direttamente, non attraverso un segnale. `Invio` sceglie l'opzione all'indice corrente, `Esc` e `Tab`
non chiudono da soli: emettono verso il componente padre, che decide.

I tasti stampabili si comportano in modo diverso nei due padri, ed è il senso dell'input
`parentType`. Su un select costruiscono una stringa di ricerca incrementale, azzerata dopo 500 ms
di pausa, e portano la selezione sulla prima opzione la cui etichetta la contiene. Su un
autocomplete rimandano il fuoco alla casella di testo del padre, perché lì a filtrare è il campo.

In modo `single` la lista antepone da sé un'opzione vuota, che è il modo per tornare a «nessuna
scelta»; in modo `multiple` no, e la deselezione avviene riscegliendo l'opzione. La scelta multipla
tollera di ricevere un valore singolo invece di un array e lo tratta come array di uno.

L'opzione può portare un `renderer`, un `TemplateRef` che sostituisce l'etichetta e riceve nel
contesto l'opzione, se è selezionata e il suo indice.

## Dipende da

- `Tooltip` (`projects/quang/overlay/tooltip/`) — i componenti che estendono questa base lo usano per
  mostrare il messaggio di aiuto; gli input `helpTooltipPosition` e `showHelpTooltipMethod` sono
  dichiarati qui e consumati lì. Vedi `docs/automatica/features/tooltip.md`.
- `Configurazione Quang` (`projects/quang/index.ts`) — la lista delle opzioni inietta il token del
  livello di log in modo opzionale, e lo usa solo per decidere se stampare in console l'errore
  della misurazione dello scroll. Vedi `docs/automatica/features/configurazione-quang.md`.

Confini esterni: `@angular/forms` per `NgControl`, `FormControl` e `Validators`;
`@jsverse/transloco` per la traduzione delle etichette delle opzioni, attiva solo con
`translateValue`.
