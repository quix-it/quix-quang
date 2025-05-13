# QuangTableComponent

The `QuangTableComponent` allows for displaying data in a tabular format.

## Features

- Tabular data display
- Customizable headers and rows
- Supports sorting and filtering

## Inputs

- `headers`: Array of column headers. (Required)
- `data`: Array of data objects to display in the table. (Required)
- `sortable`: Enables sorting for columns. Default is `false`.

## Outputs

- `rowClick`: Emits the clicked row data when a row is clicked.

## Usage

### HTML

```html
<quang-table
  [stickyTable]="true"
  [tableConfigurations]="tableConfig()"
  (sortChanged)="onChangeSort($event)"
/>
```

### TypeScript

```typescript
import { computed, signal } from '@angular/core'

tableRows = signal([
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Alice Johnson', age: 35 },
])

tableHeaders = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: false },
]

tableConfig = computed(() => ({
  headers: tableHeaders,
  rows: tableRows(),
}))
```

## Notes

This component is highly customizable and can be styled to match your application's design.
