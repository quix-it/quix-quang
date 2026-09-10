# Autocomplete

## Cosa fa

Un campo di testo che, mentre l'utente scrive, mostra una tendina di opzioni filtrate e ne fa
scegliere una. Si comporta come un controllo di form Angular a tutti gli effetti: si lega con
`formControlName`, valida, mostra messaggi di errore e di successo.

Ha due modi d'uso che cambiano il significato di quello che l'utente digita. Nel modo normale il
valore del form può essere **solo** il valore di un'opzione, e il testo digitato serve a cercarla; con
il testo libero attivo, il testo digitato **è** il valore. In più c'è la selezione multipla, dove le
scelte diventano chip rimovibili e il valore del form è un array.

## Entry point

- `projects/quang/components/autocomplete/autocomplete.component.ts` — il componente
  `<quang-autocomplete>`, esportato dall'entry point secondario `quang/components/autocomplete`.
- Input propri principali: `selectOptions` (obbligatorio), `allowFreeText`, `autoSelectOnExactMatch`,
  `updateValueOnType`, `multiple`, `internalFilterOptions`, `searchTextDebounce`, `chipMaxLength`,
  `chipsPosition`, `multiSelectDisplayMode`, `optionListMaxHeight`, `translateValue`. `syncFormWithText`
  è il vecchio nome di `allowFreeText` ed è marcato deprecato.
- Output: `selectedOption` (il valore scelto, o `null`) e `searchTextChange` (il testo digitato, dopo
  il debounce).

## Come funziona

Il componente estende la base dei componenti di form e ne eredita valore, stato di validazione,
id, etichetta ed errori. Quello che aggiunge è la gestione del testo digitato, che è tenuta separata
dal valore del form da due segnali: `_isSearching`, vero mentre l'utente sta scrivendo, e
`_userSearchText`, il testo corrente.

Il testo mostrato nella casella non è uno stato a sé: è calcolato. Mentre si cerca mostra quello che
l'utente ha scritto; altrimenti risale dal valore all'etichetta dell'opzione corrispondente, e solo
se il testo libero è attivo e nessuna opzione corrisponde mostra il valore grezzo. Un valore array —
il caso della selezione multipla — dà casella vuota, perché lì le scelte stanno nei chip.

Il punto in cui si decide tutto è un metodo unico che trasforma il testo in valore del form, chiamato
da quattro strade: la fine del debounce mentre si scrive, il blur, il tasto Tab dalla tendina, e
Invio quando la lista filtrata è vuota. Prende tre interruttori — se uscire dal modo ricerca, se
aggiornare quando c'è corrispondenza, se azzerare il testo — e con quelli distingue i casi:

- il testo corrisponde **esattamente** all'etichetta di un'opzione (confronto senza maiuscole e senza
  spazi ai bordi) e l'auto-selezione è attiva → viene scelta quell'opzione;
- nessuna corrispondenza e testo libero attivo → il testo diventa il valore. Solo qui interviene
  `trim` della base: sul blur il testo viene ripulito ai bordi se l'input `trim` è attivo, mentre
  durante la digitazione resta grezzo;
- sul blur con casella vuota, oppure senza corrispondenza e senza testo libero → il valore viene
  azzerato a `null`. È la regola che impedisce di lasciare nel form un residuo di testo che non
  corrisponde a niente;
- durante la digitazione, senza corrispondenza e senza testo libero → il valore viene svuotato ma
  **senza** uscire dal modo ricerca, altrimenti la casella tornerebbe all'etichetta precedente sotto
  le dita dell'utente.

Se l'opzione trovata è già quella selezionata il metodo esce subito: evita di rilanciare un
`onChange` identico a ogni blur.

La scrittura in `searchTextChange` passa da un `setTimeout` con il debounce configurato, non da un
operatore RxJS. Il timer viene azzerato alla distruzione del componente e il callback controlla un
flag di distruzione prima di procedere; ricorda anche l'ultimo testo emesso e salta i duplicati. Lo
stesso callback, dopo aver emesso, aggiorna il valore del form: aggiorna anche in caso di mancata
corrispondenza quando `updateValueOnType` o il testo libero sono attivi.

Il filtro interno è per sottostringa sull'etichetta, senza distinzione di maiuscole. Con
`internalFilterOptions` a falso il componente non filtra: passa la lista intera e lascia il filtro a
chi ascolta `searchTextChange`. In modalità multipla le opzioni già diventate chip sono tolte dalla
lista.

La tendina è renderizzata solo quando è aperta **e** ci sono opzioni filtrate: con una ricerca senza
risultati non appare nulla. Il valore evidenziato nella lista non è sempre il valore del form: mentre
si cerca è l'opzione che corrisponde esattamente al testo, così l'evidenziazione anticipa quello che
verrà scelto al blur.

Il blur ha una protezione: se il fuoco si è spostato dentro la tendina il componente non lo tratta
come uscita, perché altrimenti il click su un'opzione chiuderebbe la lista prima di registrarlo. Il
confronto è sugli id, e vale solo quando l'id della tendina esiste davvero — un click fuori dal campo
lascia entrambi i riferimenti vuoti e deve invece far scattare il blur.

In modalità multipla ogni scelta passa per l'aggiunta a una lista di chip: i duplicati sono scartati
per confronto su stringa, un valore che non corrisponde a nessuna opzione entra solo se il testo
libero è attivo, e il valore propagato al form è l'array dei chip. Il tasto Backspace sulla casella,
quando è vuota e ci sono chip, sposta il fuoco sull'ultimo chip; da lì un altro Backspace lo elimina e
riporta il fuoco alla casella.

Sui tasti, il resto: le frecce aprono la tendina quando è chiusa e altrimenti lasciano navigare alla
lista, Esc chiude e riporta il fuoco alla casella, Tab chiude e consolida il valore. Invio ha un
comportamento proprio solo quando serve — in multipla con testo libero aggiunge il chip (l'opzione che
corrisponde, o il testo digitato), e in singola con testo libero interviene solo quando la lista
filtrata è vuota, perché altrimenti la scelta la fa la tendina.

Il registro delle osservazioni annota un punto di questo file: il listener di tastiera aggiunto
all'ultimo chip a ogni Backspace (`docs/automatica/osservazioni.md`).

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — la classe base del controllo di form
  e il componente della tendina delle opzioni, con il tipo `SelectOption`. Vedi
  `docs/automatica/condivisi/base-componenti.md`.
- `Tooltip` (`projects/quang/overlay/tooltip/`) — usato per il tooltip del messaggio di aiuto e per il
  testo intero dei chip troncati. Vedi `docs/automatica/features/tooltip.md`.

Confine esterno: `@jsverse/transloco` traduce etichetta, segnaposto e messaggi.
