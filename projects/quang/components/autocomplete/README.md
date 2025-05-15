# QuangAutocompleteComponent

The `QuangAutocompleteComponent` provides real-time suggestions as the user types, allowing for easy selection from a list of filtered options. It is designed to be flexible and customizable for a variety of use cases in Angular forms.

## Features

- Real-time suggestions as the user types
- Easy selection from filtered options
- Customizable suggestion list and display
- Supports Angular Reactive Forms and Template-driven Forms
- Configurable debounce for search input
- Readonly and validation support

## Inputs

- `selectOptions`: `SelectOption[]` — Array of options to display as suggestions. **(Required)**
- `syncFormWithText`: `boolean` — If true, the form value is kept in sync with the input text. Default: `false`.
- `optionListMaxHeight`: `string` — Max height for the dropdown list. Default: `'200px'`.
- `translateValue`: `boolean` — Whether to translate option values. Default: `true`.
- `scrollBehaviorOnOpen`: `ScrollBehavior` — Scroll behavior when opening the dropdown. Default: `'smooth'`.
- `emitOnly`: `boolean` — If true, only emits the value without saving it in ngControl. Default: `false`.
- `searchTextDebounce`: `number` — Debounce time in milliseconds for search input. Default: `300`.
- `internalFilterOptions`: `boolean` — If true, filters options internally. Default: `true`.
- All standard form/label/validation-related inputs inherited from `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Outputs

- `selectedOption`: Emits the selected value when a suggestion is selected.
- `searchTextChange`: Emits the current search text as the user types.
- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`

## Usage

```html
<quang-autocomplete
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  [searchTextDebounce]="500"
  [selectOptions]="stringListFiltered()"
  (searchTextChange)="changeTextTest($event)"
  (selectedOption)="onSelectOption($event)"
  class="col-6"
  componentLabel="form.label.autocompleteAsync"
  formControlName="testInput1"
  successMessage="form.label.success"
/>
```

## Notes

This component extends the `QuangBaseComponent` and inherits its features, such as label and validation messages. It is recommended to use with Angular Reactive Forms for best results.

For more advanced usage and customization, refer to the full documentation and examples in the Quang library.
