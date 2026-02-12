# QuangPaginatorComponent

The `QuangPaginatorComponent` is a pagination control that provides navigation through large datasets with configurable page sizes and internationalization support.

## Inputs

- `page`: `number` — Current active page number (1-based indexing). **(Required)**
- `pageSize`: `number` — Number of items displayed per page. **(Required)**
- `totalItems`: `number` — Total number of items in the dataset. **(Required)**
- `sizeList`: `number[]` — Array of available page size options for user selection. Default: `[]`
- `showTotalElementsCount`: `boolean` — Controls visibility of total items count display. Default: `true`
- `totalItemsText`: `string` — Translation key for total items label text. Default: `'quangPaginator.totalItems'`
- `sizeText`: `string` — Translation key for page size selector label. Default: `'quangPaginator.size'`
- `pageRangeText`: `string` — Translation key for page range display. Must include `{{page}}` and `{{amountPages}}` placeholders. Default: `'quangPaginator.pageRange'`
- `componentId`: `string` — Unique identifier for the paginator instance
- `componentTabIndex`: `number` — Base tab index for paginator controls. Default: `0`
- `componentClass`: `string | string[]` — Additional CSS classes for styling customization

## Outputs

- `changePage`: `EventEmitter<number>` — Emitted when user navigates to a different page
- `changeSize`: `EventEmitter<number>` — Emitted when user changes the page size

## Usage

### Basic Paginator

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

#### TypeScript Example

```typescript
export class MyComponent {
  currentPage = 1
  itemsPerPage = 20
  totalItemCount = 150

  onPageChange(page: number): void {
    this.currentPage = page
    // Load data for new page
  }

  onPageSizeChange(pageSize: number): void {
    this.itemsPerPage = pageSize
    this.currentPage = 1 // Reset to first page
    // Load data with new page size
  }
}
```

### Translation Integration

The component uses QuangTranslationService for all text content:

- **Default Keys**: Uses `quangPaginator.*` translation keys
- **Custom Override**: All text keys can be overridden via inputs
- **Placeholder Support**: Page range text supports `{{page}}` and `{{amountPages}}` placeholders
- **Dynamic Translation**: Responds to language changes automatically
