# QuangAutocompleteComponent

The `QuangAutocompleteComponent` is a comprehensive autocomplete input with real-time suggestions, multiple selection capabilities, and chip management. It provides intelligent filtering, keyboard navigation, and seamless integration with Angular forms while supporting both single and multiple selection modes.

## Inputs

- `selectOptions`: `SelectOption[]` — Array of available options for selection. Each option should have `value` and `label` properties. **(Required)**
- `allowFreeText`: `boolean` — When true, allows any text input as a valid form value, not just option values. The form value will sync with whatever text the user types. When false, the form value must match one of the option values. Default: `false`
- `autoSelectOnExactMatch`: `boolean` — When true and `allowFreeText` is false, automatically selects an option if the user's input text matches an option's label exactly (case-insensitive, trimmed). This provides a better UX by auto-selecting when users type a complete option label. Default: `true`
- `updateValueOnType`: `boolean` — When true, updates the form value as the user types (after debounce). When false, the form value is only updated when the user selects an option from the dropdown or when the input loses focus (blur). Default: `false`
- `multiple`: `boolean` — Enable multiple selection mode with chip display. Default: `false`
- `multiSelectDisplayMode`: `'vertical' | 'horizontal'` — Layout direction for chips in multiple mode. Horizontal mode includes scroll support. Default: `'vertical'`
- `chipMaxLength`: `number` — Maximum character length for chip labels. Longer labels will be truncated with ellipsis. Default: `0` (no limit)
- `optionListMaxHeight`: `string` — Maximum height for dropdown option list with CSS units. Default: `'200px'`
- `translateValue`: `boolean` — Enable translation of option values through QuangTranslationService. Default: `true`
- `scrollBehaviorOnOpen`: `ScrollBehavior` — Scroll behavior when opening dropdown ('smooth' or 'instant'). Default: `'smooth'`
- `emitOnly`: `boolean` — Only emit selection events without updating form control. Useful for read-only suggestion display. Default: `false`
- `searchTextDebounce`: `number` — Debounce delay in milliseconds for search input to optimize performance. Default: `300`
- `internalFilterOptions`: `boolean` — Use built-in filtering logic. Disable for custom external filtering via searchTextChange event. Default: `true`
- `syncFormWithText`: `boolean` — **@deprecated** Use `allowFreeText` instead. Synchronize form control value with input text as user types. Default: `false`
- `isReadonly`: `boolean` — Set component to read-only mode. Inherited from `QuangBaseComponent`
- `componentLabel`: `string` — Label text for the component. Inherited from `QuangBaseComponent`
- `componentPlaceholder`: `string` — Placeholder text for the input. Inherited from `QuangBaseComponent`
- `componentTabIndex`: `number` — Tab index for accessibility. Inherited from `QuangBaseComponent`
- `componentClass`: `string | string[]` — Additional CSS classes. Inherited from `QuangBaseComponent`
- `errorMap`: `{[key: string]: string}` — Custom error messages. Inherited from `QuangBaseComponent`
- `successMessage`: `string` — Success message to display. Inherited from `QuangBaseComponent`
- `helpMessage`: `string` — Help text for the component. Inherited from `QuangBaseComponent`
- `formControl`: `FormControl` — Form control for reactive forms. Inherited from `QuangBaseComponent`

## Outputs

- `selectedOption`: `EventEmitter<string | number | null>` — Emitted when an option is selected in single mode. Provides the selected option's value
- `searchTextChange`: `EventEmitter<string>` — Emitted when search text changes after debounce period. Use for external filtering or API calls
- `componentBlur`: `EventEmitter<void>` — Emitted when component loses focus. Inherited from `QuangBaseComponent`

## Usage

### Basic Single Selection

```html
<quang-autocomplete
  [selectOptions]="countryOptions"
  formControlName="country"
>
</quang-autocomplete>
```

### Multiple Selection with Chips

```html
<quang-autocomplete
  [selectOptions]="skillOptions"
  [multiple]="true"
  formControlName="skills"
>
</quang-autocomplete>
```

#### TypeScript Example

```typescript
export class MyComponent {
  countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' }
  ]

  skillOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' }
  ]

  onOptionSelected(value: string | number | null): void {
    console.log('Selected:', value)
  }

  onSearchChange(searchTerm: string): void {
    // Handle external filtering
  }
}
```

### Translation Integration

The component uses QuangTranslationService for all text content:

- **Automatic Translation**: Option labels and component messages are translated automatically
- **Key Support**: Use translation keys as labels for automatic localization
- **Fallback Handling**: Provides fallback display when translations are unavailable
- **Dynamic Language Switching**: Responds to language changes without component reload
