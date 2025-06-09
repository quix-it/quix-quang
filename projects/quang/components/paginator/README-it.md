# Componente QuangPaginator

Il `QuangPaginatorComponent` fornisce controlli per la navigazione tra pagine di dati, supportando la configurazione di elementi totali, elementi per pagina e pagina corrente.

## Funzionalità

- Controlli di paginazione
- Configurazione di elementi totali, elementi per pagina e pagina corrente
- Emette eventi per i cambi pagina

## Input

- `page`: `number` — Numero della pagina corrente. **(Obbligatorio)**
- `pageSize`: `number` — Numero di elementi per pagina. **(Obbligatorio)**
- `sizeList`: `number[]` — Elenco delle dimensioni di pagina selezionabili. Default: `[]`.
- `totalItems`: `number` — Numero totale di elementi da paginare. **(Obbligatorio)**
- `showTotalElementsCount`: `boolean` — Mostra/nasconde il conteggio totale degli elementi. Default: `true`.
- `totalItemsText`: `string` — Chiave di traduzione per l'etichetta degli elementi totali. Default: `'quangPaginator.totalItems'`.
- `sizeText`: `string` — Chiave di traduzione per l'etichetta della dimensione. Default: `'quangPaginator.size'`.
- `pageRangeText`: `string` — Chiave di traduzione per l'etichetta dell'intervallo di pagine. Default: `'quangPaginator.pageRange'`.
- `componentId`, `componentTabIndex`, `componentClass`: Input standard del componente.

## Output

- `changePage`: Emette il nuovo numero di pagina quando l'utente naviga tra le pagine.
- `changeSize`: Emette la nuova dimensione di pagina quando l'utente la modifica.

## Esempio d'uso

```html
<quang-paginator
  [page]="1"
  [pageSize]="10"
  [sizeList]="[5, 10, 20]"
  [totalItems]="30"
  (changePage)="onChangePage($event)"
  (changeSize)="onChangePageSize($event)"
/>
```

## Note

Questo componente fornisce un'interfaccia intuitiva per la paginazione in liste e tabelle.
