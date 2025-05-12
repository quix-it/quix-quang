# QuangSelectComponent

The `QuangSelectComponent` supports single or multiple selections from a dropdown list.

## Features
- Single selection
- Multiple selection
- Customizable options

## Inputs
- `options`: Array of options to display in the dropdown. (Required)
- `multiple`: Enables multiple selection mode. Default is `false`.
- `placeholder`: Placeholder text for the dropdown. Default is `"Select an option"`.

## Outputs
- `selectionChange`: Emits the selected value(s) when the selection changes.

## Usage
```html
<quang-select
  [options]="['Option 1', 'Option 2', 'Option 3']"
  [multiple]="true"
  [placeholder]="'Choose options'"
  (selectionChange)="onSelectionChange($event)"
></quang-select>
```

## Notes
This component extends the `QuangBaseComponent` and inherits its features, such as label and validation messages.
