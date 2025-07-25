# QuangAutocompleteComponent

The `QuangAutocompleteComponent` is a comprehensive autocomplete input with real-time suggestions, multiple selection capabilities, and chip management. It provides intelligent filtering, keyboard navigation, and seamless integration with Angular forms while supporting both single and multiple selection modes.

## Supported Features

### Selection Modes
- **Single Selection**: Traditional autocomplete with single value selection
- **Multiple Selection**: Chip-based multiple selection with visual feedback
- **Chip Management**: Add, remove, and navigate chips with keyboard and mouse
- **Empty Value Handling**: Configurable behavior for empty selections

### Input Filtering
- **Real-time Filtering**: Live search with configurable debouncing
- **Internal Filtering**: Built-in text-based filtering with case-insensitive matching
- **External Filtering**: Support for custom filtering via search events
- **Option Synchronization**: Keep form values synchronized with display text

### Display Customization
- **Chip Layouts**: Horizontal or vertical chip arrangement
- **Chip Length Limits**: Configurable maximum chip label length
- **Dropdown Sizing**: Customizable dropdown height and positioning
- **Scroll Behavior**: Smooth or instant scrolling for dropdown opening

### Accessibility & Navigation
- **Keyboard Navigation**: Full keyboard support for chips and options
- **Focus Management**: Intelligent focus handling between input and chips
- **Screen Reader Support**: ARIA labels and announcements
- **Backspace Navigation**: Navigate and delete chips with backspace key

### Internationalization
- **Translation Support**: Integrated with QuangTranslationService
- **Value Translation**: Optional translation of option values
- **Label Localization**: Full support for localized labels and messages

## Inputs

- `selectOptions`: `SelectOption[]` — Array of available options for selection. Each option should have `value` and `label` properties. **(Required)**
- `multiple`: `boolean` — Enable multiple selection mode with chip display. Default: `false`
- `multiSelectDisplayMode`: `'vertical' | 'horizontal'` — Layout direction for chips in multiple mode. Horizontal mode includes scroll support. Default: `'vertical'`
- `chipMaxLength`: `number` — Maximum character length for chip labels. Longer labels will be truncated with ellipsis. Default: `0` (no limit)
- `syncFormWithText`: `boolean` — Synchronize form control value with input text as user types. Useful for free-text input with suggestions. Default: `false`
- `optionListMaxHeight`: `string` — Maximum height for dropdown option list with CSS units. Default: `'200px'`
- `translateValue`: `boolean` — Enable translation of option values through QuangTranslationService. Default: `true`
- `scrollBehaviorOnOpen`: `ScrollBehavior` — Scroll behavior when opening dropdown ('smooth' or 'instant'). Default: `'smooth'`
- `emitOnly`: `boolean` — Only emit selection events without updating form control. Useful for read-only suggestion display. Default: `false`
- `searchTextDebounce`: `number` — Debounce delay in milliseconds for search input to optimize performance. Default: `300`
- `internalFilterOptions`: `boolean` — Use built-in filtering logic. Disable for custom external filtering via searchTextChange event. Default: `true`
All standard inputs inherited from `QuangBaseComponent`: `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Outputs

- `selectedOption`: `EventEmitter<string | number | null>` — Emitted when an option is selected in single mode. Provides the selected option's value
- `searchTextChange`: `EventEmitter<string>` — Emitted when search text changes after debounce period. Use for external filtering or API calls
All standard outputs inherited from `QuangBaseComponent`: `componentBlur`

## Usage

### Basic Single Selection
```html
<quang-autocomplete
  [selectOptions]="countryOptions"
  [errorMap]="errors()"
  componentLabel="form.label.country"
  componentPlaceholder="Start typing country name..."
  formControlName="country"
>
</quang-autocomplete>
```

### Multiple Selection with Chips
```html
<quang-autocomplete
  [selectOptions]="skillOptions"
  [multiple]="true"
  [multiSelectDisplayMode]="'horizontal'"
  [chipMaxLength]="20"
  [errorMap]="errors()"
  componentLabel="form.label.skills"
  componentPlaceholder="Add skills..."
  formControlName="skills"
  successMessage="Skills selected successfully"
>
</quang-autocomplete>
```

### External API Integration
```html
<quang-autocomplete
  [selectOptions]="filteredUsers"
  [internalFilterOptions]="false"
  [searchTextDebounce]="500"
  [errorMap]="errors()"
  (searchTextChange)="searchUsers($event)"
  (selectedOption)="onUserSelected($event)"
  componentLabel="form.label.assignee"
  componentPlaceholder="Search users..."
  formControlName="assignedUser"
>
</quang-autocomplete>
```

#### TypeScript for External API
```typescript
filteredUsers: SelectOption[] = [];
private userService = inject(UserService);

searchUsers(searchTerm: string): void {
  if (searchTerm.length >= 2) {
    this.userService.searchUsers(searchTerm).subscribe(users => {
      this.filteredUsers = users.map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName} (${user.email})`
      }));
    });
  } else {
    this.filteredUsers = [];
  }
}

onUserSelected(userId: string | number | null): void {
  if (userId) {
    console.log('Selected user ID:', userId);
  }
}
```

### Readonly Mode with Preset Chips
```html
<quang-autocomplete
  [selectOptions]="tagOptions"
  [multiple]="true"
  [isReadonly]="true"
  [multiSelectDisplayMode]="'horizontal'"
  [chipMaxLength]="15"
  componentLabel="form.label.appliedTags"
  formControlName="tags"
>
</quang-autocomplete>
```

### Free Text Input with Suggestions
```html
<quang-autocomplete
  [selectOptions]="suggestionOptions"
  [syncFormWithText]="true"
  [errorMap]="errors()"
  componentLabel="form.label.freeTextWithSuggestions"
  componentPlaceholder="Type anything or select suggestion..."
  formControlName="freeText"
>
</quang-autocomplete>
```

### Emit-Only Mode for Display
```html
<quang-autocomplete
  [selectOptions]="displayOptions"
  [emitOnly]="true"
  (selectedOption)="showPreview($event)"
  componentLabel="Preview Selection"
  componentPlaceholder="Select item to preview..."
>
</quang-autocomplete>
```

#### TypeScript for Emit-Only
```typescript
showPreview(optionValue: string | number | null): void {
  if (optionValue) {
    // Show preview without affecting form state
    this.previewContent = this.getPreviewContent(optionValue);
  }
}
```

### Custom Dropdown Styling
```html
<quang-autocomplete
  [selectOptions]="styledOptions"
  [optionListMaxHeight]="'300px'"
  [scrollBehaviorOnOpen]="'instant'"
  [errorMap]="errors()"
  componentLabel="form.label.customDropdown"
  componentClass="custom-autocomplete"
  formControlName="styledSelection"
>
</quang-autocomplete>
```

### Localized Autocomplete
```html
<quang-autocomplete
  [selectOptions]="localizedOptions"
  [translateValue]="true"
  [errorMap]="errors()"
  componentLabel="form.label.language"
  formControlName="selectedLanguage"
>
</quang-autocomplete>
```

#### TypeScript for Localization
```typescript
localizedOptions: SelectOption[] = [
  { value: 'en', label: 'languages.english' },
  { value: 'it', label: 'languages.italian' },
  { value: 'fr', label: 'languages.french' },
  { value: 'de', label: 'languages.german' }
];
```

## Component Behavior

### Selection Modes

#### Single Selection Mode (Default)
- **Form Value**: `string | number | null`
- **User Interaction**: Type to filter, click or press Enter to select
- **Display**: Selected option label appears in input field
- **Clearing**: Backspace or Delete to clear selection

#### Multiple Selection Mode
- **Form Value**: `string[] | number[]`
- **User Interaction**: Type to filter, select multiple options as chips
- **Display**: Selected options shown as removable chips above/beside input
- **Management**: Click X on chip or use keyboard navigation to remove

### Keyboard Navigation

#### Input Field Navigation
- **Tab**: Move focus to/from autocomplete input
- **Arrow Down/Up**: Navigate through dropdown options
- **Enter**: Select focused option
- **Escape**: Close dropdown without selection

#### Chip Navigation (Multiple Mode)
- **Backspace (empty input)**: Focus last chip
- **Backspace (on chip)**: Delete focused chip
- **Arrow Left/Right**: Navigate between chips
- **Delete (on chip)**: Remove focused chip
- **Tab**: Move focus to next form element

#### Dropdown Options
- **Arrow Keys**: Navigate option list
- **Enter/Space**: Select highlighted option
- **Escape**: Close dropdown
- **Home/End**: Jump to first/last option

### Filtering Behavior

#### Internal Filtering (`internalFilterOptions: true`)
- **Case-insensitive matching**: Matches text anywhere in option labels
- **Real-time updates**: Filter updates as user types
- **Debounced search**: Uses `searchTextDebounce` to optimize performance
- **Auto-show dropdown**: Opens automatically when text is entered

#### External Filtering (`internalFilterOptions: false`)
- **Event-driven**: Emits `searchTextChange` for custom filtering
- **API Integration**: Perfect for server-side search
- **Manual control**: Component shows provided options without filtering
- **Loading states**: Manage loading indicators externally

### Form Integration

#### Reactive Forms Integration
```typescript
// Single selection
userForm = this.fb.group({
  country: ['', Validators.required]
});

// Multiple selection
preferencesForm = this.fb.group({
  interests: [[] as string[], Validators.minLength(1)]
});

// Custom validation
advancedForm = this.fb.group({
  skills: [[], this.validateSkills]
});

validateSkills(control: AbstractControl): ValidationErrors | null {
  const skills = control.value as string[];
  if (skills && skills.length > 5) {
    return { tooManySkills: { max: 5, actual: skills.length } };
  }
  return null;
}
```

#### Template-driven Forms
```html
<!-- Single selection -->
<quang-autocomplete
  [(ngModel)]="selectedCountry"
  [selectOptions]="countries"
  name="country"
  #countryRef="ngModel"
  required
>
</quang-autocomplete>

<!-- Multiple selection -->
<quang-autocomplete
  [(ngModel)]="selectedSkills"
  [selectOptions]="skills"
  [multiple]="true"
  name="skills"
  #skillsRef="ngModel"
>
</quang-autocomplete>
```

### Chip Management

#### Chip Display Options
- **Vertical Layout**: Chips stacked vertically (default)
- **Horizontal Layout**: Chips in single row with horizontal scroll
- **Length Limiting**: Truncate long chip labels with ellipsis
- **Removal Interface**: Click X button or keyboard navigation

#### Chip Interaction Patterns
```typescript
// Programmatic chip management
addChip(value: string | number): void {
  const currentValues = this.form.get('chips')?.value || [];
  if (!currentValues.includes(value)) {
    this.form.get('chips')?.setValue([...currentValues, value]);
  }
}

removeChip(value: string | number): void {
  const currentValues = this.form.get('chips')?.value || [];
  const filteredValues = currentValues.filter((v: any) => v !== value);
  this.form.get('chips')?.setValue(filteredValues);
}

clearAllChips(): void {
  this.form.get('chips')?.setValue([]);
}
```

### Performance Optimization

#### Debouncing Configuration
- **Default Debounce**: 300ms balances responsiveness and performance
- **API Integration**: Increase to 500-1000ms for external searches
- **Local Filtering**: Reduce to 100-200ms for immediate feedback
- **Heavy Processing**: Increase for complex filtering operations

#### Large Dataset Handling
```typescript
// Virtual scrolling for large option lists
largeDatasetOptions: SelectOption[] = [];

// Lazy loading implementation
loadOptions(searchTerm: string, page: number = 0): void {
  this.dataService.getOptions(searchTerm, page, 50).subscribe(options => {
    if (page === 0) {
      this.largeDatasetOptions = options;
    } else {
      this.largeDatasetOptions.push(...options);
    }
  });
}

// Memory optimization for option changes
ngOnDestroy(): void {
  this.largeDatasetOptions = [];
}
```

## Accessibility Features

### Keyboard Support
- **Full Keyboard Navigation**: Complete interaction without mouse
- **Focus Management**: Logical focus progression through components
- **Escape Sequences**: Consistent escape key behavior
- **Selection Shortcuts**: Enter and Space for selections

### Screen Reader Support
- **ARIA Labels**: Proper labeling for all interactive elements
- **Live Regions**: Announcements for selection changes
- **Role Attributes**: Correct semantic roles for autocomplete functionality
- **State Announcements**: Selection count and available options announced

### Focus Management
- **Focus Trapping**: Focus contained within active dropdown
- **Focus Return**: Returns to input after chip operations
- **Visual Indicators**: Clear focus styling for all interactive elements
- **Focus Order**: Logical tab progression

## Advanced Configuration

### Custom Option Templates
```typescript
// Define custom option interface
interface CustomSelectOption extends SelectOption {
  avatar?: string;
  category?: string;
  description?: string;
}

// Use in component
customOptions: CustomSelectOption[] = [
  {
    value: 'john.doe',
    label: 'John Doe',
    avatar: '/avatars/john.jpg',
    category: 'Developer',
    description: 'Senior Frontend Developer'
  }
];
```

### Dynamic Option Loading
```typescript
// Service for dynamic options
@Injectable()
export class AutocompleteDataService {
  private cache = new Map<string, SelectOption[]>();

  searchOptions(query: string, category?: string): Observable<SelectOption[]> {
    const cacheKey = `${query}-${category}`;
    
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey)!);
    }

    return this.http.get<any[]>(`/api/search`, {
      params: { q: query, category: category || '' }
    }).pipe(
      map(items => items.map(item => ({
        value: item.id,
        label: item.name
      }))),
      tap(options => this.cache.set(cacheKey, options))
    );
  }
}

// Component usage
onSearchChange(searchTerm: string): void {
  this.dataService.searchOptions(searchTerm, this.selectedCategory)
    .subscribe(options => {
      this.selectOptions = options;
    });
}
```

### Custom Validation
```typescript
// Multi-selection validator
export function chipCountValidator(min: number, max: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!Array.isArray(value)) return null;
    
    if (value.length < min) {
      return { minChips: { required: min, actual: value.length } };
    }
    
    if (value.length > max) {
      return { maxChips: { required: max, actual: value.length } };
    }
    
    return null;
  };
}

// Usage in form
form = this.fb.group({
  tags: [[], [chipCountValidator(1, 5)]]
});
```

### Styling Customization
```scss
// Custom autocomplete styling
.custom-autocomplete {
  .autocomplete-input {
    border: 2px solid #007bff;
    border-radius: 8px;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }
  
  .chip-container {
    &.horizontal {
      max-width: 100%;
      overflow-x: auto;
      scrollbar-width: thin;
      
      &::-webkit-scrollbar {
        height: 6px;
      }
    }
  }
  
  .chip {
    background: linear-gradient(45deg, #007bff, #0056b3);
    color: white;
    border-radius: 16px;
    
    .chip-close {
      color: rgba(255, 255, 255, 0.8);
      
      &:hover {
        color: white;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
  
  .option-list {
    border: 1px solid #007bff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    .option-item {
      &:hover, &.focused {
        background: rgba(0, 123, 255, 0.1);
      }
      
      &.selected {
        background: #007bff;
        color: white;
      }
    }
  }
}
```

## Best Practices

### Option Management
- **Consistent Value Types**: Use either strings or numbers consistently
- **Unique Values**: Ensure option values are unique within the dataset
- **Label Clarity**: Provide descriptive labels that help users identify options
- **Category Grouping**: Group related options for better user experience

### Performance Guidelines
- **Debounce Optimization**: Adjust debounce timing based on data source
- **Option Limiting**: Limit displayed options to prevent overwhelming users
- **Caching Strategy**: Cache frequently accessed option sets
- **Virtual Scrolling**: Implement for datasets over 1000 items

### UX Recommendations
- **Placeholder Text**: Provide helpful placeholder text describing expected input
- **Minimum Search Length**: Require 2-3 characters before showing suggestions
- **Loading States**: Show loading indicators for async operations
- **Error Handling**: Provide clear error messages for failed searches

### Accessibility Guidelines
- **Label Association**: Always provide meaningful labels
- **Error Descriptions**: Link error messages to form controls
- **Keyboard Testing**: Test all functionality with keyboard only
- **Screen Reader Testing**: Verify with actual screen reader software

## Troubleshooting

### Common Issues

#### Options not displaying
- **Check selectOptions**: Ensure array is properly populated
- **Verify filtering**: Check `internalFilterOptions` setting
- **Debug search events**: Monitor `searchTextChange` emissions
- **Validate option format**: Ensure objects have `value` and `label` properties

#### Form value not updating
- **Form control binding**: Verify `formControlName` or `formControl` is correct
- **Multiple mode**: Check if form expects array for multiple selection
- **Sync settings**: Review `syncFormWithText` and `emitOnly` configuration
- **Validation state**: Ensure form control is not disabled

#### Chip functionality issues
- **Multiple mode**: Verify `multiple` input is set to `true`
- **Keyboard navigation**: Check focus management and event handling
- **Display layout**: Test both vertical and horizontal chip layouts
- **Length limiting**: Verify `chipMaxLength` configuration

#### Performance problems
- **High debounce**: Increase `searchTextDebounce` for slow operations
- **Large datasets**: Implement pagination or virtual scrolling
- **Memory leaks**: Check for proper subscription cleanup
- **Frequent re-renders**: Optimize change detection strategy

### Styling Issues

#### Dropdown positioning
- **Container overflow**: Check parent container CSS overflow settings
- **Z-index conflicts**: Ensure dropdown has sufficient z-index
- **Viewport clipping**: Test dropdown near screen edges
- **Mobile responsiveness**: Verify behavior on mobile devices

#### Chip container layout
- **Horizontal scrolling**: Verify scroll behavior in horizontal mode
- **Responsive design**: Test chip wrapping and container sizing
- **Focus indicators**: Ensure keyboard focus is visible
- **Touch targets**: Verify adequate touch target size for mobile

### Integration Problems

#### API integration
- **CORS issues**: Verify API access from client domain
- **Response format**: Ensure API returns expected data structure
- **Error handling**: Implement proper error handling for failed requests
- **Rate limiting**: Handle API rate limits with appropriate debouncing

#### Form framework conflicts
- **Validation timing**: Check validation trigger timing
- **Custom validators**: Verify validator compatibility
- **Form state management**: Review form control state changes
- **Event propagation**: Check for event handling conflicts

#### Third-party library conflicts
- **CSS framework conflicts**: Check for conflicting styles
- **Event listener conflicts**: Verify event handling doesn't interfere
- **Dependency versions**: Ensure compatible library versions
- **Import order**: Check module import order in Angular

## Notes

This component extends `QuangBaseComponent` and inherits all its features, including label management, validation display, error handling, and success messages. It integrates seamlessly with Angular's reactive forms system and provides extensive customization options for various use cases.

### SelectOption Interface
The component expects options in the following format:
```typescript
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: any; // Additional custom properties
}
```

### Integration with QuangTranslationService
- **Automatic Translation**: Option labels and component messages are translated automatically
- **Key Support**: Use translation keys as labels for automatic localization
- **Fallback Handling**: Provides fallback display when translations are unavailable
- **Dynamic Language Switching**: Responds to language changes without component reload
