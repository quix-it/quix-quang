# Componente QuangPaginator

Il `QuangPaginatorComponent` è un controllo paginazione che fornisce navigazione attraverso grandi dataset con dimensioni pagina configurabili e supporto internazionalizzazione.

## Input

- `page`: `number` — Numero pagina attiva corrente (indicizzazione basata su 1). **(Obbligatorio)**
- `pageSize`: `number` — Numero elementi visualizzati per pagina. **(Obbligatorio)**
- `totalItems`: `number` — Numero totale elementi nel dataset. **(Obbligatorio)**
- `sizeList`: `number[]` — Array opzioni dimensione pagina disponibili per selezione utente. Default: `[]`
- `showTotalElementsCount`: `boolean` — Controlla visibilità display conteggio elementi totali. Default: `true`
- `totalItemsText`: `string` — Chiave traduzione per testo etichetta elementi totali. Default: `'quangPaginator.totalItems'`
- `sizeText`: `string` — Chiave traduzione per etichetta selettore dimensione pagina. Default: `'quangPaginator.size'`
- `pageRangeText`: `string` — Chiave traduzione per display intervallo pagina. Deve includere placeholder `{{page}}` e `{{amountPages}}`. Default: `'quangPaginator.pageRange'`
- `componentId`: `string` — Identificatore unico per istanza paginatore
- `componentTabIndex`: `number` — Indice tab base per controlli paginatore. Default: `0`
- `componentClass`: `string | string[]` — Classi CSS aggiuntive per personalizzazione stile

## Output

- `changePage`: `EventEmitter<number>` — Emesso quando utente naviga a pagina diversa
- `changeSize`: `EventEmitter<number>` — Emesso quando utente cambia dimensione pagina

## Utilizzo

```html
<quang-paginator
  [page]="currentPage"
  [pageSize]="itemsPerPage"
  [totalItems]="totalItemCount"
  (changePage)="onPageChange($event)"
  (changeSize)="onPageSizeChange($event)"
>
</quang-paginator>
```

#### Esempio TypeScript

```typescript
export class MyComponent {
  currentPage = 1
  itemsPerPage = 20
  totalItemCount = 150

  onPageChange(page: number): void {
    this.currentPage = page
    // Carica dati per nuova pagina
  }

  onPageSizeChange(pageSize: number): void {
    this.itemsPerPage = pageSize
    this.currentPage = 1 // Reset alla prima pagina
    // Carica dati con nuova dimensione pagina
  }
}
```

### Integrazione Traduzione

Il componente usa QuangTranslationService per tutto contenuto testuale:

- **Chiavi Default**: Usa chiavi traduzione `quangPaginator.*`
- **Override Personalizzato**: Tutte chiavi testo possono essere sovrascritte tramite input
- **Supporto Placeholder**: Testo intervallo pagina supporta placeholder `{{page}}` e `{{amountPages}}`
- **Traduzione Dinamica**: Risponde a cambiamenti lingua automaticamente
