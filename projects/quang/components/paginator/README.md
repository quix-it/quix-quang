# QuangPaginatorComponent

The `QuangPaginatorComponent` provides controls for navigating through pages of data, supporting configurations for total items, items per page, and current page.

## Features

- Pagination controls
- Configurable total items, items per page, and current page
- Emits events for page changes

## Inputs

- `page`: `number` — Current page number. **(Required)**
- `pageSize`: `number` — Number of items per page. **(Required)**
- `sizeList`: `number[]` — List of selectable page sizes. Default: `[]`.
- `totalItems`: `number` — Total number of items to paginate. **(Required)**
- `showTotalElementsCount`: `boolean` — Show/hide total items count. Default: `true`.
- `totalItemsText`: `string` — Translation key for total items label. Default: `'quangPaginator.totalItems'`.
- `sizeText`: `string` — Translation key for size label. Default: `'quangPaginator.size'`.
- `pageRangeText`: `string` — Translation key for page range label. Default: `'quangPaginator.pageRange'`.
- `componentId`, `componentTabIndex`, `componentClass`: Standard component inputs.

## Outputs

- `changePage`: Emits the new page number when the user navigates to a different page.
- `changeSize`: Emits the new page size when the user changes it.

## Usage

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

## Notes

This component provides a user-friendly interface for pagination in lists and tables.
