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

### Paginatore Base
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

### Paginatore con Opzioni Dimensione Pagina
```html
<quang-paginator
  [page]="currentPage"
  [pageSize]="itemsPerPage"
  [totalItems]="totalItemCount"
  [sizeList]="[10, 25, 50, 100]"
  (changePage)="onPageChange($event)"
  (changeSize)="onPageSizeChange($event)"
>
</quang-paginator>
```

#### Esempio TypeScript
```typescript
export class MyComponent {
  currentPage = 1;
  itemsPerPage = 20;
  totalItemCount = 150;

  onPageChange(page: number): void {
    this.currentPage = page;
    // Carica dati per nuova pagina
  }

  onPageSizeChange(pageSize: number): void {
    this.itemsPerPage = pageSize;
    this.currentPage = 1; // Reset alla prima pagina
    // Carica dati con nuova dimensione pagina
  }
}
```
  ```
```

### Integrazione API con Paginazione Lato Server
```html
<quang-paginator
  [page]="apiPagination.page"
  [pageSize]="apiPagination.size"
  [totalItems]="apiPagination.total"
  [sizeList]="[10, 25, 50, 100]"
  (changePage)="loadPage($event)"
  (changeSize)="changePageSize($event)"
>
</quang-paginator>
```

#### TypeScript per Integrazione API
```typescript
interface ApiPaginationResponse {
  data: any[];
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}

apiPagination = {
  page: 1,
  size: 20,
  total: 0
};

loading = false;
data: any[] = [];

loadPage(page: number): void {
  this.apiPagination.page = page;
  this.fetchData();
}

changePageSize(size: number): void {
  this.apiPagination.size = size;
  this.apiPagination.page = 1; // Reset alla prima pagina
  this.fetchData();
}

private fetchData(): void {
  this.loading = true;
  
  const params = {
    page: this.apiPagination.page,
    size: this.apiPagination.size
  };
  
  this.dataService.getData(params).subscribe({
    next: (response: ApiPaginationResponse) => {
      this.data = response.data;
      this.apiPagination = {
        page: response.pagination.page,
        size: response.pagination.size,
        total: response.pagination.total
      };
      this.loading = false;
    },
    error: (error) => {
      console.error('Caricamento dati fallito:', error);
      this.loading = false;
    }
  });
}
```

### Etichette Personalizzate e Traduzioni
```html
<quang-paginator
  [page]="currentPage"
  [pageSize]="pageSize"
  [totalItems]="totalItems"
  [sizeList]="[5, 10, 20]"
  totalItemsText="custom.totalRecords"
  sizeText="custom.recordsPerPage"
  pageRangeText="custom.pageInfo"
  (changePage)="onPageChange($event)"
  (changeSize)="onPageSizeChange($event)"
>
</quang-paginator>
```

#### Esempio File Traduzione
```json
{
  "custom": {
    "totalRecords": "Record Totali:",
    "recordsPerPage": "Record per pagina:",
    "pageInfo": "Pagina {{page}} di {{amountPages}}"
  },
  "quangPaginator": {
    "totalItems": "Elementi totali:",
    "size": "Elementi per pagina:",
    "pageRange": "Pagina {{page}} di {{amountPages}}"
  }
}
```

### Conteggio Totale Nascosto
```html
<quang-paginator
  [page]="currentPage"
  [pageSize]="pageSize"
  [totalItems]="totalItems"
  [sizeList]="[10, 25, 50]"
  [showTotalElementsCount]="false"
  (changePage)="onPageChange($event)"
  (changeSize)="onPageSizeChange($event)"
>
</quang-paginator>
```

### Stile Personalizzato
```html
<quang-paginator
  [page]="currentPage"
  [pageSize]="pageSize"
  [totalItems]="totalItems"
  [sizeList]="[10, 20, 50]"
  componentClass="custom-paginator"
  (changePage)="onPageChange($event)"
  (changeSize)="onPageSizeChange($event)"
>
</quang-paginator>
```

### Integrazione Form Reattivi
```html
<form [formGroup]="searchForm">
  <input formControlName="query" placeholder="Cerca...">
  
  <quang-paginator
    [page]="pagination.page"
    [pageSize]="pagination.size"
    [totalItems]="pagination.total"
    [sizeList]="[10, 25, 50]"
    (changePage)="onPageChange($event)"
    (changeSize)="onPageSizeChange($event)"
  >
  </quang-paginator>
</form>
```

#### TypeScript per Integrazione Form
```typescript
searchForm = this.fb.group({
  query: ['']
});

ngOnInit() {
  // Reagisce ai cambiamenti ricerca
  this.searchForm.get('query')?.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    )
    .subscribe(query => {
      this.pagination.page = 1; // Reset alla prima pagina su ricerca
      this.performSearch(query);
    });
}

performSearch(query: string): void {
  const params = {
    query,
    page: this.pagination.page,
    size: this.pagination.size
  };
  
  this.searchService.search(params).subscribe(results => {
    this.updatePaginationFromResults(results);
  });
}
```

### Integrazione Stati Caricamento
```html
<div class="table-container">
  <table class="table">
    <!-- Contenuto tabella -->
  </table>
  
  <div *ngIf="loading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
</div>

<quang-paginator
  [page]="pagination.page"
  [pageSize]="pagination.size"
  [totalItems]="pagination.total"
  [sizeList]="[10, 25, 50]"
  [componentClass]="loading ? 'disabled' : ''"
  (changePage)="!loading && onPageChange($event)"
  (changeSize)="!loading && onPageSizeChange($event)"
>
</quang-paginator>
```

## Comportamento Componente

### Logica Navigazione

#### Navigazione Pagina
- **Prima Pagina**: Imposta pagina corrente a 1, disabilitato quando già sulla prima pagina
- **Pagina Precedente**: Decrementa pagina corrente di 1, disabilitato quando sulla prima pagina
- **Pagina Successiva**: Incrementa pagina corrente di 1, disabilitato quando sull'ultima pagina
- **Ultima Pagina**: Imposta pagina corrente a pagine totali, disabilitato quando già sull'ultima pagina

#### Cambiamenti Dimensione Pagina
- **Reset Automatico**: Quando cambia dimensione pagina, pagina corrente si resetta a 1
- **Ricalcolo Pagine Totali**: Pagine totali automaticamente ricalcolate basato su nuova dimensione pagina
- **Aggiornamento Dati**: Eventi `changePage` e `changeSize` emessi per aggiornamento dati completo

### Gestione Stato

#### Tracking Stato Interno
```typescript
// Componente traccia pagina corrente e dimensione pagina internamente
_currentPage = signal<number>(1);
_pageSize = signal<number>(0);
_totalPages = computed(() => Math.ceil(this.totalItems() / this._pageSize()));

// Risponde a cambiamenti prop esterni
page$ = toObservable(this.page).subscribe(page => {
  this._currentPage.set(page);
});

pageSize$ = toObservable(this.pageSize).subscribe(pageSize => {
  this._pageSize.set(pageSize);
});
```

#### Sincronizzazione Stato Esterno
```typescript
// Componente padre mantiene stato paginazione
paginationState = {
  currentPage: 1,
  pageSize: 20,
  totalItems: 0
};

onPageChange(page: number): void {
  this.paginationState.currentPage = page;
  this.loadData();
}

onPageSizeChange(size: number): void {
  this.paginationState.pageSize = size;
  this.paginationState.currentPage = 1; // Reset alla prima pagina
  this.loadData();
}
```

### Pattern Integrazione Dati

#### Paginazione Lato Client
```typescript
// Tutti dati caricati in anticipo, paginati localmente
clientSidePagination() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedData = this.allData.slice(startIndex, endIndex);
}
```

#### Paginazione Lato Server
```typescript
// Dati recuperati per pagina dal server
serverSidePagination() {
  const params = {
    page: this.currentPage,
    size: this.pageSize,
    ...this.filters
  };
  
  this.apiService.getData(params).subscribe(response => {
    this.displayedData = response.data;
    this.totalItems = response.total;
  });
}
```

#### Paginazione Ibrida
```typescript
// Combinazione caching e richieste server
hybridPagination() {
  const cacheKey = `page-${this.currentPage}-size-${this.pageSize}`;
  
  if (this.cache.has(cacheKey)) {
    this.displayedData = this.cache.get(cacheKey);
    return;
  }
  
  this.apiService.getData(params).subscribe(response => {
    this.displayedData = response.data;
    this.cache.set(cacheKey, response.data);
  });
}
```

### Comportamento Responsivo

#### Adattamenti Mobile
- **Layout Flessibile**: Usa flexbox per disposizione responsiva
- **Controlli Wrap**: Controlli si avvolgono su schermi più piccoli
- **Touch-friendly**: Dimensioni target touch adeguate per mobile
- **Display Compatto**: Spaziatura ottimizzata per dispositivi mobili

#### Comportamenti Breakpoint
```scss
.paginatorContainer {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  
  @media (min-width: 576px) {
    flex-wrap: nowrap;
    order: 2;
  }
  
  .page-size {
    order: 2;
    min-width: 80px;
    
    @media (min-width: 576px) {
      order: 1;
    }
  }
}
```

### Considerazioni Prestazioni

#### Reattività Basata su Signal
- **Valori Computati**: Pagine totali calcolate reattivamente
- **Change Detection**: Strategia OnPush per prestazioni ottimali
- **Gestione Sottoscrizioni**: Pulizia automatica con takeUntilDestroyed

#### Strategie Ottimizzazione
```typescript
// Debounce cambiamenti pagina rapidi
private pageChangeSubject = new Subject<number>();

ngOnInit() {
  this.pageChangeSubject
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      takeUntilDestroyed()
    )
    .subscribe(page => {
      this.loadPageData(page);
    });
}

onPageChange(page: number): void {
  this.pageChangeSubject.next(page);
}
```

## Configurazione Avanzata

### Template Pulsanti Personalizzati
```typescript
// Estendi componente per rendering pulsanti personalizzati
@Component({
  selector: 'custom-paginator',
  template: `
    <quang-paginator
      [page]="page"
      [pageSize]="pageSize"
      [totalItems]="totalItems"
      (changePage)="onPageChange($event)"
      (changeSize)="onPageSizeChange($event)"
    >
    </quang-paginator>
  `,
  styles: [`
    ::ng-deep .page-link {
      border-radius: 4px;
      margin: 0 2px;
      border: 1px solid #ddd;
    }
  `]
})
export class CustomPaginatorComponent {
  // Implementazione personalizzata
}
```

### Persistenza Stato
```typescript
// Salva stato paginazione su localStorage
savePaginationState(): void {
  const state = {
    page: this.currentPage,
    pageSize: this.pageSize
  };
  localStorage.setItem('pagination-state', JSON.stringify(state));
}

loadPaginationState(): void {
  const saved = localStorage.getItem('pagination-state');
  if (saved) {
    const state = JSON.parse(saved);
    this.currentPage = state.page;
    this.pageSize = state.pageSize;
  }
}
```

### Integrazione URL
```typescript
// Sincronizza paginazione con parametri URL
@Component({
  // ...
})
export class DataListComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Leggi paginazione da URL
    this.route.queryParams.subscribe(params => {
      this.currentPage = parseInt(params['page']) || 1;
      this.pageSize = parseInt(params['size']) || 20;
      this.loadData();
    });
  }
  
  onPageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { page, size: this.pageSize },
      queryParamsHandling: 'merge'
    });
  }
  
  onPageSizeChange(size: number): void {
    this.router.navigate([], {
      queryParams: { page: 1, size },
      queryParamsHandling: 'merge'
    });
  }
}
```

### Logica Dimensione Pagina Personalizzata
```typescript
// Opzioni dimensione pagina dinamiche basate su dati
get availablePageSizes(): number[] {
  const total = this.totalItems;
  const sizes = [10, 25, 50];
  
  if (total > 100) sizes.push(100);
  if (total > 500) sizes.push(500);
  
  return sizes.filter(size => size < total);
}
```

## Best Practice

### Gestione Dati
- **Stato Coerente**: Mantieni stato paginazione sincronizzato tra componente e origine dati
- **Reset su Cambiamenti**: Reset alla prima pagina quando cambiano filtri o termini ricerca
- **Stati Caricamento**: Mostra indicatori caricamento durante recupero dati
- **Gestione Errori**: Gestisci errori paginazione elegantemente

### Esperienza Utente
- **Feedback Immediato**: Fornisci feedback visivo istantaneo per azioni navigazione
- **Preserva Contesto**: Mantieni posizione utente quando appropriato
- **Indicazione Chiara**: Mostra pagina corrente e pagine totali chiaramente
- **Dimensioni Logiche**: Offri opzioni dimensione pagina sensate (10, 25, 50, 100)

### Linee Guida Prestazioni
- **Aggiornamenti Efficienti**: Ricarica dati solo quando necessario
- **Strategia Caching**: Cache pagine accedute frequentemente
- **Debounce Richieste**: Previeni chiamate API successive rapide
- **Scroll Virtuale**: Considera scroll virtuale per dataset molto grandi

### Best Practice Accessibilità
- **Navigazione Tastiera**: Assicura tutti controlli siano accessibili da tastiera
- **Supporto Screen Reader**: Fornisci etichette chiare e informazioni stato
- **Gestione Focus**: Mantieni progressione focus logica
- **Annunci Stato**: Annuncia cambiamenti pagina a tecnologie assistive

## Risoluzione Problemi

### Problemi Comuni

#### Pagina non aggiornata correttamente
- **Controlla Props**: Assicura che prop `page` sia correttamente associata e aggiornata
- **Sincronizzazione Stato**: Verifica che componente padre aggiorni suo stato pagina
- **Gestione Eventi**: Controlla che evento `changePage` sia gestito correttamente
- **Valori Iniziali**: Assicura che valore pagina iniziale sia valido (>= 1)

#### Calcolo pagine totali errato
- **Verifica totalItems**: Controlla che `totalItems` rifletta conteggio dati effettivo
- **Valori Dimensione Pagina**: Assicura che `pageSize` sia maggiore di 0
- **Coerenza Dati**: Verifica che conteggio dati corrisponda a valore `totalItems`
- **Comportamento Math.ceil**: Ricorda che dataset vuoti dovrebbero mostrare 0 pagine

#### Selettore dimensione pagina non funzionante
- **Array SizeList**: Verifica che `sizeList` contenga numeri validi
- **Gestore Cambiamento**: Assicura che evento `changeSize` sia gestito correttamente
- **Aggiornamenti Stato**: Controlla che componente padre aggiorni prop `pageSize`
- **Selezione Opzione**: Verifica che opzione selezionata corrisponda a dimensione pagina corrente

#### Pulsanti navigazione disabilitati erroneamente
- **Controlli Confine**: Verifica logica rilevamento prima/ultima pagina
- **Pagine Totali**: Assicura che calcolo pagine totali sia corretto
- **Confini Pagina**: Controlla che pagina corrente sia nell'intervallo valido
- **Aggiornamenti Stato**: Verifica che componente riceva prop aggiornate

### Problemi Integrazione

#### Mismatch paginazione API
- **Convenzione Indice**: Verifica indicizzazione pagina basata su 0 vs 1
- **Nomi Parametri**: Controlla che API si aspetti nomi parametri corretti
- **Struttura Risposta**: Assicura che struttura risposta API corrisponda aspettative
- **Risposte Errore**: Gestisci errori API e risposte invalide

#### Problemi prestazioni con dataset grandi
- **Paginazione Lato Server**: Implementa paginazione lato server appropriata
- **Ottimizzazione Richieste**: Debounce cambiamenti pagina rapidi
- **Strategia Caching**: Cache pagine accedute frequentemente
- **Scroll Virtuale**: Considera alternative per dataset molto grandi

#### Problemi stili e layout
- **Conflitti CSS**: Controlla stili in conflitto
- **Comportamento Responsivo**: Testa su diverse dimensioni schermo
- **Dipendenze Bootstrap**: Assicura che classi Bootstrap siano disponibili
- **Stili Personalizzati**: Verifica che classi personalizzate siano applicate correttamente

### Problemi Integrazione Form

#### Problemi reset ricerca e filtri
- **Reset Pagina**: Sempre reset a pagina 1 quando cambiano filtri
- **Coordinamento Stato**: Sincronizza paginazione con stato form
- **Ordine Eventi**: Assicura ordine gestione eventi appropriato
- **Aggiornamenti Debounced**: Gestisci cambiamenti filtri rapidi appropriatamente

#### Sincronizzazione parametri URL
- **Parsing Parametri**: Gestisci parametri URL invalidi elegantemente
- **Timing Navigazione**: Coordina con cambiamenti parametri route
- **Cronologia Browser**: Considera comportamento pulsanti indietro/avanti
- **Valori Default**: Fornisci default sensati per parametri mancanti

## Note

Questo componente fornisce una soluzione paginazione completa con opzioni personalizzazione estese e gestione stato robusta. Si integra perfettamente con scenari paginazione sia lato client che lato server.

### Integrazione Traduzione
Il componente usa QuangTranslationService per tutto contenuto testuale:
- **Chiavi Default**: Usa chiavi traduzione `quangPaginator.*`
- **Override Personalizzato**: Tutte chiavi testo possono essere sovrascritte tramite input
- **Supporto Placeholder**: Testo intervallo pagina supporta placeholder `{{page}}` e `{{amountPages}}`
- **Traduzione Dinamica**: Risponde a cambiamenti lingua automaticamente

### Funzionalità Accessibilità
- **Supporto ARIA**: Attributi ARIA appropriati per stati pulsanti
- **Navigazione Tastiera**: Tab attraverso tutti elementi interattivi
- **Screen Reader Friendly**: Etichette chiare e annunci stato
- **Indicatori Focus**: Indicatori focus visivi per tutti controlli

### Compatibilità Browser
- **Supporto Browser Moderni**: Funziona in tutti browser moderni
- **Supporto IE11**: Compatibile con Internet Explorer 11
- **Browser Mobili**: Ottimizzato per esperienze browser mobile
- **Supporto Touch**: Interfaccia touch-friendly per mobile
