# QuangPaginatorComponent

The `QuangPaginatorComponent` provides controls for navigating through pages of data, supporting configurations for total items, items per page, and current page.

## Features

- Pagination controls
- Configurable total items, items per page, and current page
- Emits events for page changes

## Inputs

- `totalItems`: Total number of items to paginate. (Required)
- `itemsPerPage`: Number of items per page. Default is `10`.
- `currentPage`: The current page number. Default is `1`.

## Outputs

- `pageChange`: Emits the new page number when the user navigates to a different page.

## Usage

```html
<quang-paginator
  [page]="testForm.controls.page.value"
  [pageSize]="testForm.controls.pageSize.value"
  [sizeList]="sizeList"
  [totalItems]="30"
  (changePage)="onChangePage($event)"
  (changeSize)="onChangePageSize($event)"
/>
```

## Notes

This component is designed to work seamlessly with lists and tables, providing a user-friendly interface for pagination.
