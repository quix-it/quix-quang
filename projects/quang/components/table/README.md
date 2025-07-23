# QuangTableComponent

The `QuangTableComponent` allows for displaying data in a tabular format with advanced features for customization, sorting, and row selection.

## Features

- Tabular data display
- Customizable headers and rows
- Supports sorting by columns
- Custom cell rendering with templates
- Row selection and highlighting
- Sticky header option

## Interfaces

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
  text?: string;          // Display text for the header
  sort?: SortCol;         // Sort configuration for the column
  css?: string[];         // CSS classes to apply to the header
  renderer?: TemplateRef<any>; // Custom template for header rendering
  payload?: any;          // Additional data that can be used in custom renderers
}
```

### TableRow<T>
```typescript
interface TableRow<T> {
  payload?: T;            // The data object for this row
  rowId?: string | number; // Unique identifier for the row
  css?: string[];         // CSS classes to apply to the row
  cellData: TableCell[];   // Array of cells in this row
}
```

### TableCell
```typescript
interface TableCell {
  renderer?: TemplateRef<any>; // Custom template for cell rendering
  payload?: any;          // Additional data that can be used in custom renderers
  text?: string;          // Display text for the cell
  css?: string[];         // CSS classes to apply to the cell
  fullWidth?: boolean;    // Whether the cell should span the full width
}
```

### SortCol
```typescript
interface SortCol {
  key: string;            // Identifier for the column
  sort: SortTable;        // Sort direction (DEFAULT, ASC, DESC)
}
```

## Inputs

- `tableConfigurations`: `TableConfiguration<T>` — Table configuration object containing headers and rows. **(Required)**
  - This object defines the structure and data of your table.
  
- `clickableRow`: `boolean` — Whether rows should be clickable. Default: `false`.
  - When true, clicking a row will emit the row data through the `selectedRow` output.

- `selectedRows`: `string[] | number[]` — Array of rowIds that should be marked as selected.
  - Use this to highlight specific rows in the table.

- `stickyTable`: `boolean` — Enables sticky header. Default: `true`.
  - When true, the header will remain visible when scrolling.

- `noResultsText`: `string` — Text to display when no data is available. Default: 'quangTable.noResults'.
  - This supports translation keys if using transloco.

## Outputs

- `sortChanged`: `EventEmitter<SortCol[]>` — Emits when the user changes the sorting of a column.
  - Returns an array of SortCol objects with the updated sorting state.

- `selectedRow`: `EventEmitter<TableRow<T>>` — Emits when a row is clicked (if clickableRow is true).
  - Returns the full row data including payload.

## Usage

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
  // Sample data
  userData = signal([
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', age: 35 },
  ]);
  
  selectedRowIds = signal<number[]>([1]); // Row with ID 1 will be highlighted
  
  // Define headers
  tableHeaders = [
    {
      text: 'ID',
      sort: { key: 'id', sort: SortTable.DEFAULT }
    },
    {
      text: 'Name',
      sort: { key: 'name', sort: SortTable.DEFAULT }
    },
    {
      text: 'Email',
      sort: { key: 'email', sort: SortTable.DEFAULT }
    },
    {
      text: 'Age',
      sort: { key: 'age', sort: SortTable.DEFAULT }
    }
  ];
  
  // Compute rows from data
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
  
  // Combine headers and rows into table configuration
  tableConfig = computed<TableConfiguration<any>>(() => ({
    headers: this.tableHeaders,
    rows: this.tableRows()
  }));
  
  onRowClick(row: TableRow<any>): void {
    console.log('Row clicked:', row.payload);
  }
  
  onChangeSort(sortCols: SortCol[]): void {
    const sortCol = sortCols[0];
    const sortDirection = sortCol.sort;
    
    // Sort data based on column and direction
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

## Advanced Usage with Custom Templates

You can use templates to customize cell rendering:

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
    { text: 'Name', renderer: this.nameTemplate },
    { text: 'Email' },
    { text: 'Age' }
  ],
  rows: this.userData().map(user => ({
    rowId: user.id,
    payload: user,
    cellData: [
      { text: user.id.toString() },
      { payload: user }, // This will be accessible in the template
      { text: user.email },
      { text: user.age.toString() }
    ]
  }))
}))
```

## Notes

- The table automatically adjusts column widths to match content.
- Use CSS classes to customize the appearance of specific rows, headers, or cells.
- For responsive tables, consider setting appropriate container widths.
