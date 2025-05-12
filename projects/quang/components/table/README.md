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

```html
<quang-table
  [stickyTable]="true"
  [tableConfigurations]="tableConfig()"
  (sortChanged)="onChangeSort($event)"
/>
```

## Notes

This component is highly customizable and can be styled to match your application's design.
