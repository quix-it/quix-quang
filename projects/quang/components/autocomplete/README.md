# QuangAutocompleteComponent

The `QuangAutocompleteComponent` provides real-time suggestions as the user types, allowing for easy selection from a list of filtered options.

## Features

- Real-time suggestions
- Easy selection from filtered options
- Customizable suggestion list

## Inputs

- `options`: Array of options to display as suggestions. (Required)
- `placeholder`: Placeholder text for the input field. Default is `"Type to search..."`.
- `minChars`: Minimum number of characters to trigger suggestions. Default is `1`.

## Outputs

- `selectionChange`: Emits the selected value when a suggestion is selected.

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

This component extends the `QuangBaseComponent` and inherits its features, such as label and validation messages.
