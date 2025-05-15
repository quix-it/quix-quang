# QuangSelectComponent

The `QuangSelectComponent` supports single or multiple selections from a dropdown list.

## Features

- Single selection
- Multiple selection
- Customizable options

## Inputs

- `selectOptions`: `SelectOption[]` — Array of options to display in the dropdown. **(Required)**
- `selectionMode`: `'single' | 'multiple'` — Enables single or multiple selection mode. Default: `'single'`.
- All standard form/label/validation-related inputs inherited from `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Outputs

- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`

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
