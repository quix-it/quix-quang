# QuangAutocompleteComponent

The `QuangAutocompleteComponent` provides real-time suggestions as the user types, allowing for easy selection from a list of filtered options. It is designed to be flexible and customizable for a variety of use cases in Angular forms.

## Features

- Real-time suggestions as the user types
- Easy selection from filtered options
- Customizable suggestion list and display
- Supports Angular Reactive Forms and Template-driven Forms
- Configurable debounce for search input
- Readonly and validation support
- **Multiple selection with chips** (with horizontal/vertical display)
- Keyboard navigation and chip deletion (Backspace)
- Focus management for chips (Backspace focuses last chip, second Backspace deletes it)

## Inputs

- `selectOptions`: `SelectOption[]` — Array of options to display as suggestions. **(Required)**
- `multiple`: `boolean` — Enable multiple selection mode (chips). Default: `false`.
- `multiSelectDisplayMode`: `'vertical' | 'horizontal'` — Display chips vertically or horizontally. Default: `'vertical'`.
- `chipMaxLength`: `number` — Maximum length (in characters) for a single chip label. Default: `0` (no limit).
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

## Multiple/Chip Mode

- When `multiple` is `true`, selected options are displayed as removable chips.
- Chips can be displayed horizontally or vertically using `multiSelectDisplayMode`.
- Chips have a close button for removal. When the input is empty, pressing Backspace focuses the last chip; pressing Backspace again deletes it.
- Focus is managed for accessibility: after deleting a chip, focus moves to the previous chip or input.
- Chip container supports horizontal scrolling with the mouse wheel in horizontal mode.
- You can limit chip label length with `chipMaxLength`.

## Usage

```html
<quang-autocomplete
  [multiple]="true"
  [multiSelectDisplayMode]="'horizontal'"
  [chipMaxLength]="12"
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
