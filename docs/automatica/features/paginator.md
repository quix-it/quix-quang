# Paginator

## Cosa fa

La barra di navigazione fra le pagine di un elenco. Mostra il totale degli elementi, un menù per
scegliere quanti elementi per pagina, la posizione corrente nella forma «pagina di totale pagine» e
quattro bottoni: prima pagina, precedente, successiva, ultima.

Non pagina i dati: non riceve l'elenco e non lo taglia. Riceve i numeri che descrivono la
paginazione — pagina corrente, dimensione della pagina, totale degli elementi — e notifica in uscita
la pagina o la dimensione che l'utente ha scelto. Chi lo usa recupera i dati e gli ripassa i numeri
aggiornati.

Non è un campo di form: non si lega a un `FormControl` e non ha validazione, etichetta o messaggi di
errore. È l'unico componente di `components/` che non estende la base dei controlli di form.

## Entry point

- `projects/quang/components/paginator/paginator.component.ts` — il componente `<quang-paginator>`,
  esportato dall'entry point secondario `quang/components/paginator`.
- Input obbligatori: `page`, `pageSize`, `totalItems`. Input opzionali: `sizeList` (le dimensioni
  offerte nel menù; se resta vuoto il menù non compare), `showTotalElementsCount`, `componentId`,
  `componentTabIndex`, `componentClass`, e le tre chiavi di traduzione `totalItemsText`, `sizeText`,
  `pageRangeText`.
- Output: `changePage` con il numero della pagina scelta, `changeSize` con la nuova dimensione.
- Lo stesso entry point esporta altre tre cose, che il componente non usa e che nel repo non ha
  nessun consumatore: `QuangPaginatorService` (`getPage`, che taglia un array dato pagina e
  dimensione), `PaginatorIntl` con la sua sottoclasse `QuangPaginatorLanguageService`, e
  `PaginatorModule`, un `NgModule` che non dichiara niente.

## Come funziona

Le pagine sono contate **da 1**, non da zero: `goToFirstPage()` porta a `1` e il bottone della
pagina precedente è disabilitato quando la pagina corrente è `<= 1`.

Il componente tiene due segnali propri, `_currentPage` e `_pageSize`, allineati agli input omonimi
da due sottoscrizioni create al momento della costruzione e riallineati una volta in `ngOnInit`. I
bottoni muovono quei segnali **subito** e poi emettono l'output: l'aggiornamento è quindi ottimistico,
la barra si sposta prima che chi la usa abbia confermato la nuova pagina. Se il chiamante non
riscrive l'input `page`, la sottoscrizione non riporta mai indietro il segnale e i due valori
restano divergenti.

Il totale delle pagine è calcolato, non ricevuto: `Math.ceil(totalItems / _pageSize)`. È il valore
che disabilita i bottoni della pagina successiva e dell'ultima, ed è anche il numero mostrato
nell'etichetta della posizione corrente.

Cambiare la dimensione della pagina non lascia l'utente dov'era: `onChangeSize()` legge il valore
scelto dal menù, lo converte con `parseInt`, emette `changeSize` e poi chiama `goToFirstPage()`, che
emette anche `changePage` con `1`. Un solo gesto produce quindi **due** output. Il valore letto viene
scartato se è vuoto o se il bersaglio dell'evento non è un `<select>`.

Le opzioni del menù non hanno un attributo `value`: il valore arriva dal testo dell'opzione, ed è per
questo che `onChangeSize()` deve convertirlo. L'opzione selezionata è marcata confrontando il numero
della lista con `_pageSize`.

Le etichette non sono stringhe ma chiavi di traduzione, risolte nel template con la pipe di
Transloco. `pageRangeText` è l'unica con parametri: riceve `page` e `amountPages`, quindi la stringa
tradotta deve contenere entrambi i segnaposto. I default puntano a `quangPaginator.totalItems`,
`quangPaginator.size` e `quangPaginator.pageRange`.

I quattro bottoni non hanno testo né nome accessibile: il contenuto è un `svg` inline, senza
`aria-label`.

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — solo per `makeId`, che genera l'id di
  default. Non estende la classe base. Vedi `docs/automatica/condivisi/base-componenti.md`.

Confine esterno: `@jsverse/transloco` traduce le tre etichette.
