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
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  [selectOptions]="stringList"
  class="col-4"
  componentLabel="form.label.select"
  componentPlaceholder="Placeholder select singola scelta"
  formControlName="testInput"
  playgroundSourceCode
  selectionMode="single"
  successMessage="form.label.success"
/>

<quang-select
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  [selectOptions]="numberList"
  class="col-4"
  componentLabel="form.label.multipleSelect"
  componentPlaceholder="Placeholder select scelta multipla"
  formControlName="testInputMultiple"
  selectionMode="multiple"
  successMessage="form.label.success"
/>
```

## Notes

This component extends the `QuangBaseComponent` and inherits its features, such as label and validation messages.
