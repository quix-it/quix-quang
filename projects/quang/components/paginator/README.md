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

### Paginator with Page Size Options
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

#### TypeScript Example
```typescript
export class MyComponent {
  currentPage = 1;
  itemsPerPage = 20;
  totalItemCount = 150;

  onPageChange(page: number): void {
    this.currentPage = page;
    // Load data for new page
  }

  onPageSizeChange(pageSize: number): void {
    this.itemsPerPage = pageSize;
    this.currentPage = 1; // Reset to first page
    // Load data with new page size
  }
}
}

```
```

### API Integration with Server-side Pagination
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

#### TypeScript for API Integration
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
  this.apiPagination.page = 1; // Reset to first page
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
      console.error('Failed to load data:', error);
      this.loading = false;
    }
  });
}
```

### Custom Labels and Translations
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

#### Translation File Example
```json
{
  "custom": {
    "totalRecords": "Total Records:",
    "recordsPerPage": "Records per page:",
    "pageInfo": "Page {{page}} of {{amountPages}}"
  },
  "quangPaginator": {
    "totalItems": "Total items:",
    "size": "Items per page:",
    "pageRange": "Page {{page}} of {{amountPages}}"
  }
}
```

### Hidden Total Count
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

### Custom Styling
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

### Reactive Form Integration
```html
<form [formGroup]="searchForm">
  <input formControlName="query" placeholder="Search...">
  
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

#### TypeScript for Form Integration
```typescript
searchForm = this.fb.group({
  query: ['']
});

ngOnInit() {
  // React to search changes
  this.searchForm.get('query')?.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    )
    .subscribe(query => {
      this.pagination.page = 1; // Reset to first page on search
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

### Loading States Integration
```html
<div class="table-container">
  <table class="table">
    <!-- Table content -->
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

## Component Behavior

### Navigation Logic

#### Page Navigation
- **First Page**: Sets current page to 1, disabled when already on first page
- **Previous Page**: Decrements current page by 1, disabled when on first page
- **Next Page**: Increments current page by 1, disabled when on last page
- **Last Page**: Sets current page to total pages, disabled when already on last page

#### Page Size Changes
- **Automatic Reset**: When page size changes, current page resets to 1
- **Total Pages Recalculation**: Total pages automatically recalculated based on new page size
- **Data Refresh**: Both `changePage` and `changeSize` events emitted for complete data refresh

### State Management

#### Internal State Tracking
```typescript
// Component tracks current page and page size internally
_currentPage = signal<number>(1);
_pageSize = signal<number>(0);
_totalPages = computed(() => Math.ceil(this.totalItems() / this._pageSize()));

// Responds to external prop changes
page$ = toObservable(this.page).subscribe(page => {
  this._currentPage.set(page);
});

pageSize$ = toObservable(this.pageSize).subscribe(pageSize => {
  this._pageSize.set(pageSize);
});
```

#### External State Synchronization
```typescript
// Parent component maintains pagination state
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
  this.paginationState.currentPage = 1; // Reset to first page
  this.loadData();
}
```

### Data Integration Patterns

#### Client-side Pagination
```typescript
// All data loaded upfront, paginated locally
clientSidePagination() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedData = this.allData.slice(startIndex, endIndex);
}
```

#### Server-side Pagination
```typescript
// Data fetched per page from server
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

#### Hybrid Pagination
```typescript
// Combination of caching and server requests
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

### Responsive Behavior

#### Mobile Adaptations
- **Flexible Layout**: Uses flexbox for responsive arrangement
- **Wrap Controls**: Controls wrap on smaller screens
- **Touch-friendly**: Adequate touch target sizes for mobile
- **Compact Display**: Optimized spacing for mobile devices

#### Breakpoint Behaviors
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

### Performance Considerations

#### Signal-based Reactivity
- **Computed Values**: Total pages calculated reactively
- **Change Detection**: OnPush strategy for optimal performance
- **Subscription Management**: Automatic cleanup with takeUntilDestroyed

#### Optimization Strategies
```typescript
// Debounce rapid page changes
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

## Advanced Configuration

### Custom Button Templates
```typescript
// Extend component for custom button rendering
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
  // Custom implementation
}
```

### State Persistence
```typescript
// Save pagination state to localStorage
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

### URL Integration
```typescript
// Sync pagination with URL parameters
@Component({
  // ...
})
export class DataListComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Read pagination from URL
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

### Custom Page Size Logic
```typescript
// Dynamic page size options based on data
get availablePageSizes(): number[] {
  const total = this.totalItems;
  const sizes = [10, 25, 50];
  
  if (total > 100) sizes.push(100);
  if (total > 500) sizes.push(500);
  
  return sizes.filter(size => size < total);
}
```

## Best Practices

### Data Management
- **Consistent State**: Keep pagination state synchronized between component and data source
- **Reset on Changes**: Reset to first page when filters or search terms change
- **Loading States**: Show loading indicators during data fetches
- **Error Handling**: Handle pagination errors gracefully

### User Experience
- **Immediate Feedback**: Provide instant visual feedback for navigation actions
- **Preserve Context**: Maintain user's position when appropriate
- **Clear Indication**: Show current page and total pages clearly
- **Logical Sizes**: Offer sensible page size options (10, 25, 50, 100)

### Performance Guidelines
- **Efficient Updates**: Only reload data when necessary
- **Caching Strategy**: Cache frequently accessed pages
- **Debounce Requests**: Prevent rapid successive API calls
- **Virtual Scrolling**: Consider virtual scrolling for very large datasets

### Accessibility Best Practices
- **Keyboard Navigation**: Ensure all controls are keyboard accessible
- **Screen Reader Support**: Provide clear labels and state information
- **Focus Management**: Maintain logical focus progression
- **State Announcements**: Announce page changes to assistive technologies

## Troubleshooting

### Common Issues

#### Page not updating correctly
- **Check Props**: Ensure `page` prop is properly bound and updated
- **State Synchronization**: Verify parent component updates its page state
- **Event Handling**: Check that `changePage` event is properly handled
- **Initial Values**: Ensure initial page value is valid (>= 1)

#### Total pages calculation incorrect
- **Verify totalItems**: Check that `totalItems` reflects actual data count
- **Page Size Values**: Ensure `pageSize` is greater than 0
- **Data Consistency**: Verify data count matches `totalItems` value
- **Math.ceil Behavior**: Remember that empty datasets should show 0 pages

#### Page size selector not working
- **SizeList Array**: Verify `sizeList` contains valid numbers
- **Change Handler**: Ensure `changeSize` event is properly handled
- **State Updates**: Check that parent component updates `pageSize` prop
- **Option Selection**: Verify selected option matches current page size

#### Navigation buttons disabled incorrectly
- **Boundary Checks**: Verify first/last page detection logic
- **Total Pages**: Ensure total pages calculation is correct
- **Page Bounds**: Check that current page is within valid range
- **State Updates**: Verify component receives updated props

### Integration Problems

#### API pagination mismatch
- **Index Convention**: Verify 0-based vs 1-based page indexing
- **Parameter Names**: Check API expects correct parameter names
- **Response Structure**: Ensure API response structure matches expectations
- **Error Responses**: Handle API errors and invalid responses

#### Performance issues with large datasets
- **Server-side Pagination**: Implement proper server-side pagination
- **Request Optimization**: Debounce rapid page changes
- **Caching Strategy**: Cache frequently accessed pages
- **Virtual Scrolling**: Consider alternatives for very large datasets

#### Styling and layout issues
- **CSS Conflicts**: Check for conflicting styles
- **Responsive Behavior**: Test on different screen sizes
- **Bootstrap Dependencies**: Ensure Bootstrap classes are available
- **Custom Styling**: Verify custom classes are properly applied

### Form Integration Problems

#### Search and filter reset issues
- **Page Reset**: Always reset to page 1 when filters change
- **State Coordination**: Synchronize pagination with form state
- **Event Order**: Ensure proper event handling order
- **Debounced Updates**: Handle rapid filter changes appropriately

#### URL parameter synchronization
- **Parameter Parsing**: Handle invalid URL parameters gracefully
- **Navigation Timing**: Coordinate with route parameter changes
- **Browser History**: Consider back/forward button behavior
- **Default Values**: Provide sensible defaults for missing parameters

## Notes

This component provides a complete pagination solution with extensive customization options and robust state management. It integrates seamlessly with both client-side and server-side pagination scenarios.

### Translation Integration
The component uses QuangTranslationService for all text content:
- **Default Keys**: Uses `quangPaginator.*` translation keys
- **Custom Override**: All text keys can be overridden via inputs
- **Placeholder Support**: Page range text supports `{{page}}` and `{{amountPages}}` placeholders
- **Dynamic Translation**: Responds to language changes automatically

### Accessibility Features
- **ARIA Support**: Proper ARIA attributes for button states
- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader Friendly**: Clear labels and state announcements
- **Focus Indicators**: Visual focus indicators for all controls

### Browser Compatibility
- **Modern Browser Support**: Works in all modern browsers
- **IE11 Support**: Compatible with Internet Explorer 11
- **Mobile Browsers**: Optimized for mobile browser experiences
- **Touch Support**: Touch-friendly interface for mobile devices
