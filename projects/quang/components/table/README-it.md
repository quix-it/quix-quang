# Componente QuangTable

Il `QuangTableComponent` consente di visualizzare dati in formato tabellare.

## Funzionalità

- Visualizzazione dati in tabella
- Intestazioni e righe personalizzabili
- Supporto per ordinamento e filtro

## Input

- `tableConfigurations`: `{ headers: TableHeader[]; rows: any[] }` — Oggetto di configurazione della tabella con intestazioni e righe. **(Obbligatorio)**
- `stickyTable`: `boolean` — Abilita header/colonne sticky. Default: `false`.
- Tutti gli input standard di form/etichetta/validazione ereditati da `QuangBaseComponent` (se applicabile):
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- `sortChanged`: Emette lo stato di ordinamento quando l'utente cambia l'ordinamento.
- `rowClick`: Emette i dati della riga cliccata quando una riga viene selezionata.

## Esempio d'uso

### HTML

```html
<quang-table
  [stickyTable]="true"
  [tableConfigurations]="tableConfig()"
  (sortChanged)="onChangeSort($event)"
  (rowClick)="onRowClick($event)"
/>
```

### TypeScript

```typescript
import { computed, signal } from '@angular/core'

// Segnali Angular per dati e intestazioni della tabella

tableRows = signal([
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Alice Johnson', age: 35 },
])

tableHeaders = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'age', label: 'Età', sortable: false },
]

tableConfig = computed(() => ({
  headers: tableHeaders,
  rows: tableRows(),
}))
```

## Note

Questo componente è altamente personalizzabile e può essere stilizzato per adattarsi al design della tua applicazione.
