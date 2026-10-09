# Table

## Cosa fa

Mostra dati in forma tabellare a partire da un solo oggetto di configurazione: l'elenco delle
intestazioni e l'elenco delle righe, con ogni cella già pronta come testo oppure disegnata da un
template fornito da chi usa il componente.

Sa evidenziare righe, notificare il click su una riga, e gestire il gesto di ordinamento sulle
colonne — ma **non ordina i dati**: emette quale ordinamento l'utente ha chiesto e aspetta che il
chiamante gli ripassi le righe già ordinate. L'intestazione può restare ferma mentre il corpo scorre,
in verticale e in orizzontale.

Quando non ci sono righe, al posto della tabella mostra una sola frase, tradotta.

## Entry point

- `projects/quang/components/table/table.component.ts` — il componente `<quang-table>`, esportato
  dall'entry point secondario `quang/components/table`.
- Input: `tableConfigurations` (obbligatorio), `clickableRow`, `selectedRows`, `stickyTable`
  (default `true`), `sortType` (`SINGLE` o `MULTIPLE`, default `SINGLE`), `noResultsText`.
- Output: `selectedRow` con la riga cliccata per intero, `sortChanged` con l'elenco delle colonne su
  cui ordinare.
- Tipi esportati insieme al componente: `TableConfiguration`, `TableHeader`, `TableRow`,
  `TableCell`, `SortCol`, e gli enum `SortTable` e `SortType`.

## Come funziona

Non estende la base dei componenti di form: non ha valore, non si lega a un `FormControl`, non ha
stato di validazione. È l'unica cosa che ha in comune con il paginator fra i componenti della
libreria.

**La configurazione in ingresso non viene mai usata direttamente.** Un'osservazione sull'input la
ricopia dentro un segnale interno, un livello di copia per ogni intestazione e per ogni riga. Tutto
il resto del componente legge quella copia, e l'ordinamento cambia solo lei: l'oggetto di chi usa il
componente non viene mai mutato, nemmeno nel campo `sort` delle intestazioni.

### L'ordinamento

Un'intestazione è cliccabile solo se porta un `sort`. Il click fa girare la direzione della colonna
lungo il ciclo `DEFAULT` → `ASC` → `DESC` → `DEFAULT`, e da qui i due modi si separano.

In modo `SINGLE` la colonna cliccata prende la nuova direzione e **tutte le altre tornano a
`DEFAULT`** perdendo il proprio `order`. L'evento porta una sola colonna, oppure l'elenco vuoto se il
ciclo è tornato a `DEFAULT`: quello è il segnale che l'ordinamento è stato tolto.

In modo `MULTIPLE` le colonne attive si accumulano. La colonna appena cliccata viene tolta dalla coda
e rimessa **in fondo**, poi gli `order` sono riassegnati da zero secondo la nuova sequenza: l'ultimo
click è quindi la priorità più alta, non la più bassa. Il numero che l'intestazione mostra accanto al
titolo è `order + 1`, cioè la posizione contata da 1. Una colonna che torna a `DEFAULT` esce dalla
coda e il suo `order` viene azzerato.

In entrambi i modi il componente non tocca le righe. Chi lo usa riceve l'evento, ordina i dati e
riscrive `tableConfigurations`.

### L'intestazione fissa e le larghezze

Il template disegna **l'intestazione due volte**, con lo stesso identico markup. La prima copia sta
in una tabella a sé, nel contenitore in alto: è quella che si vede e che resta ferma. La seconda sta
dentro la tabella dei dati, in cima al corpo, ed è quella che il browser dimensiona davvero sul
contenuto delle celle.

`fixTableHeaderWidth` copia le larghezze dalla seconda alla prima, colonna per colonna, fissando
insieme `minWidth` e `maxWidth` di ogni `th` al valore misurato. Gira dentro un `setTimeout` senza
ritardo, perché le larghezze si possono leggere solo dopo che il browser ha impaginato. Quattro
effect distinti lo richiamano — l'arrivo dell'una o dell'altra intestazione nel DOM, e ogni
riscrittura della configurazione.

Sulla prima colonna della copia nascosta viene messo in ascolto un osservatore di larghezza: se
cambia, il calcolo riparte. Il campo `lastWidth` è ciò che impedisce il rientro infinito, dato che il
calcolo stesso cambia le larghezze; ogni ricalcolo disiscrive l'ascolto precedente prima di
registrarne uno nuovo.

I due contenitori — quello dell'intestazione fissa e quello del corpo — scorrono insieme in
orizzontale: ciascuno, quando scorre, riallinea lo `scrollLeft` dell'altro.

### Le celle

Una cella mostra il proprio `text`, oppure, se porta un `renderer`, il template di chi usa il
componente, a cui passa `payload` come valore implicito. Lo stesso vale per l'intestazione, che con
un `renderer` sostituisce il proprio testo. Il testo dell'intestazione passa dalla traduzione, quello
della cella no: le celle sono dati, le intestazioni sono etichette.

Una cella con `fullWidth` prende un `colspan` pari al numero di intestazioni. `css` aggiunge classi,
`style` stili in linea.

Il campo `properties` fa un giro diverso da tutti gli altri: viene serializzato in un attributo
`data-properties` sul `td`, e un effect lo rilegge dall'attributo per assegnare ogni chiave
direttamente sull'elemento nativo. È il punto già segnalato come osservazione (QUANG-282).

Il click su una riga emette solo se `clickableRow` è attivo. L'evidenziazione confronta il `rowId`
della riga con i valori di `selectedRows`.

## Dipende da

- `Osservazione del ridimensionamento` (`projects/quang/device/`) — il servizio che espone la
  larghezza di un elemento come flusso, usato per riallineare l'intestazione fissa quando le colonne
  cambiano misura. Vedi `docs/automatica/features/osservazione-ridimensionamento.md`.

Confine esterno: `@jsverse/transloco` traduce i testi delle intestazioni e la frase mostrata quando
non ci sono righe.
