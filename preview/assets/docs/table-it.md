# Componente QuangTable

Il `QuangTableComponent` consente di visualizzare dati in formato tabellare con funzionalità avanzate per la personalizzazione, l'ordinamento e la selezione delle righe.

## Funzionalità

- Visualizzazione dati in tabella
- Intestazioni e righe personalizzabili
- Supporto per l'ordinamento delle colonne (singolo e multiplo)
- Ordinamento multiplo: consente di ordinare la tabella su più colonne, mantenendo la priorità di ordinamento
- Rendering personalizzato delle celle con template
- Selezione e evidenziazione delle righe
- Opzione per intestazione fissa (sticky)

## Interfacce

### TableConfiguration<T>
```typescript
interface TableConfiguration<T> {
  headers: TableHeader[];
  rows: TableRow<T>[];
}
```

### TableHeader
```typescript
interface TableHeader {
  text?: string;          // Testo da visualizzare nell'intestazione
  sort?: SortCol;         // Configurazione di ordinamento per la colonna
  css?: string[];         // Classi CSS da applicare all'intestazione
  renderer?: TemplateRef<any>; // Template personalizzato per il rendering dell'intestazione
  payload?: any;          // Dati aggiuntivi utilizzabili nei renderer personalizzati
}
```

### TableRow<T>
```typescript
interface TableRow<T> {
  payload?: T;            // L'oggetto dati per questa riga
  rowId?: string | number; // Identificatore univoco per la riga
  css?: string[];         // Classi CSS da applicare alla riga
  cellData: TableCell[];   // Array di celle in questa riga
}
```

### TableCell
```typescript
interface TableCell {
  renderer?: TemplateRef<any>; // Template personalizzato per il rendering della cella
  payload?: any;          // Dati aggiuntivi utilizzabili nei renderer personalizzati
  text?: string;          // Testo da visualizzare nella cella
  css?: string[];         // Classi CSS da applicare alla cella
  fullWidth?: boolean;    // Indica se la cella deve occupare l'intera larghezza
}
```

### SortCol
```typescript
interface SortCol {
  key: string;            // Identificatore per la colonna
  sort: SortTable;        // Direzione di ordinamento (DEFAULT, ASC, DESC)
  order?: number;         // Ordine di priorità nell'ordinamento multiplo
}
```

### SortType
```typescript
export enum SortType {
  SINGLE = 'SINGLE',      // Ordinamento su una sola colonna
  MULTIPLE = 'MULTIPLE',  // Ordinamento su più colonne
}
```

## Input

- `tableConfigurations`: `TableConfiguration<T>` — Oggetto di configurazione della tabella contenente intestazioni e righe. **(Obbligatorio)**
  - Questo oggetto definisce la struttura e i dati della tabella.
  
- `clickableRow`: `boolean` — Indica se le righe devono essere cliccabili. Default: `false`.
  - Quando è true, il click su una riga emette i dati della riga attraverso l'output `selectedRow`.

- `selectedRows`: `string[] | number[]` — Array di rowId che devono essere contrassegnati come selezionati.
  - Utilizzato per evidenziare specifiche righe nella tabella.

- `stickyTable`: `boolean` — Abilita l'intestazione fissa. Default: `true`.
  - Quando è true, l'intestazione rimarrà visibile durante lo scorrimento.

- `noResultsText`: `string` — Testo da visualizzare quando non ci sono dati disponibili. Default: 'quangTable.noResults'.
  - Supporta le chiavi di traduzione se si utilizza transloco.

- `sortType`: `SortType` — Modalità di ordinamento. Default: `SINGLE`.
  - Impostare a `MULTIPLE` per abilitare l'ordinamento su più colonne. In questa modalità, l'output `sortChanged` restituirà un array ordinato di colonne con la priorità di ordinamento.

## Output

- `sortChanged`: `EventEmitter<SortCol[]>` — Emette quando l'utente cambia l'ordinamento di una colonna.
  - In modalità `MULTIPLE`, restituisce un array ordinato di oggetti SortCol che rappresentano le colonne ordinate e la loro priorità.

- `selectedRow`: `EventEmitter<TableRow<T>>` — Emette quando viene cliccata una riga (se clickableRow è true).
  - Restituisce i dati completi della riga, incluso il payload.

## Esempio d'uso

### HTML

```html
<quang-table
  [tableConfigurations]="tableConfig()"
  [clickableRow]="true"
  [stickyTable]="true"
  [selectedRows]="selectedRowIds()"
  (selectedRow)="onRowClick($event)"
  (sortChanged)="onChangeSort($event)"
/>
```

### TypeScript

```typescript
import { Component, signal, computed } from '@angular/core';
import { 
  TableConfiguration, 
  TableHeader, 
  TableRow, 
  TableCell,
  SortTable, 
  SortCol 
} from 'quang/components/table';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  // Dati di esempio
  userData = signal([
    { id: 1, name: 'Mario Rossi', email: 'mario@example.com', age: 30 },
    { id: 2, name: 'Giulia Bianchi', email: 'giulia@example.com', age: 25 },
    { id: 3, name: 'Luca Verdi', email: 'luca@example.com', age: 35 },
  ]);
  
  selectedRowIds = signal<number[]>([1]); // La riga con ID 1 sarà evidenziata
  
  // Definizione delle intestazioni
  tableHeaders = [
    {
      text: 'ID',
      sort: { key: 'id', sort: SortTable.DEFAULT }
    },
    {
      text: 'Nome',
      sort: { key: 'name', sort: SortTable.DEFAULT }
    },
    {
      text: 'Email',
      sort: { key: 'email', sort: SortTable.DEFAULT }
    },
    {
      text: 'Età',
      sort: { key: 'age', sort: SortTable.DEFAULT }
    }
  ];
  
  // Calcolo delle righe dai dati
  tableRows = computed(() => 
    this.userData().map(user => ({
      rowId: user.id,
      payload: user,
      cellData: [
        { text: user.id.toString() },
        { text: user.name },
        { text: user.email },
        { text: user.age.toString() }
      ]
    }))
  );
  
  // Combinazione di intestazioni e righe nella configurazione della tabella
  tableConfig = computed<TableConfiguration<any>>(() => ({
    headers: this.tableHeaders,
    rows: this.tableRows()
  }));
  
  onRowClick(row: TableRow<any>): void {
    console.log('Riga cliccata:', row.payload);
  }
  
  onChangeSort(sortCols: SortCol[]): void {
    const sortCol = sortCols[0];
    const sortDirection = sortCol.sort;
    
    // Ordinamento dei dati in base alla colonna e direzione
    this.userData.update(users => {
      return [...users].sort((a, b) => {
        if (sortDirection === SortTable.DEFAULT) {
          return 0;
        }
        
        const modifier = sortDirection === SortTable.ASC ? 1 : -1;
        const aValue = a[sortCol.key];
        const bValue = b[sortCol.key];
        
        if (aValue < bValue) return -1 * modifier;
        if (aValue > bValue) return 1 * modifier;
        return 0;
      });
    });
  }
}
```

## Utilizzo avanzato con Template personalizzati

È possibile utilizzare i template per personalizzare il rendering delle celle:

```html
<ng-template #nameTemplate let-data>
  <strong>{{ data.name }}</strong>
</ng-template>

<quang-table [tableConfigurations]="customTableConfig()">
</quang-table>
```

```typescript
nameTemplate = TemplateRef<ane>('nameTemplate')

customTableConfig = computed(() => ({
  headers: [
    { text: 'ID' },
    { text: 'Nome', renderer: this.nameTemplate },
    { text: 'Email' },
    { text: 'Età' }
  ],
  rows: this.userData().map(user => ({
    rowId: user.id,
    payload: user,
    cellData: [
      { text: user.id.toString() },
      { payload: user }, // Questo sarà accessibile nel template
      { text: user.email },
      { text: user.age.toString() }
    ]
  }))
}))
```

## Esempio d'uso: Ordinamento multiplo

### HTML

```html
<quang-table
  [tableConfigurations]="tableConfig()"
  [sortType]="SortType.MULTIPLE"
  (sortChanged)="onChangeSort($event)"
/>
```

### TypeScript

```typescript
import { SortType } from 'quang/components/table';

@Component({
  // ...codice esistente...
})
export class ExampleComponent {
  SortType = SortType;

  // ...codice esistente...
  
  onChangeSort(sortCols: SortCol[]): void {
    // sortCols è un array ordinato di colonne da ordinare, con la proprietà order
    // Implementa la logica di ordinamento multiplo qui
  }
}
```

## Note

- In modalità ordinamento multiplo, l'ordine delle colonne viene visualizzato nell'intestazione e gestito tramite la proprietà `order`.
- L'output `sortChanged` fornisce la sequenza di ordinamento da applicare ai dati.
- La tabella regola automaticamente la larghezza delle colonne per adattarsi al contenuto.
- Utilizza le classi CSS per personalizzare l'aspetto di specifiche righe, intestazioni o celle.
- Per tabelle responsive, considera l'impostazione di larghezze appropriate per i contenitori.
