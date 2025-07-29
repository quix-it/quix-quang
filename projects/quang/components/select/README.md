# QuangSelectComponent

The `QuangSelectComponent` supports single or multiple selections from a dropdown list.

## Input

- `selectOptions`: `SelectOption[]` - Array of options to display in the dropdown (required)
- `selectionMode`: `'single' | 'multiple'` - Selection mode (default: 'single')

All standard inputs inherited from `QuangBaseComponent`: `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

All standard outputs inherited from `QuangBaseComponent`: `componentBlur`

## Usage

### Single Selection
```html
<quang-select
  [errorMap]="errors()"
  [selectOptions]="stringList"
  componentLabel="form.label.select"
  componentPlaceholder="Select an option"
  formControlName="testInput"
  selectionMode="single">
</quang-select>
```

### Multiple Selection
```html
<quang-select
  [errorMap]="errors()"
  [selectOptions]="numberList"
  componentLabel="form.label.multipleSelect"
  componentPlaceholder="Select multiple options"
  formControlName="testInputMultiple"
  selectionMode="multiple">
</quang-select>
```

## QuangTranslationService Integration

The component supports automatic translation of all labels, help messages, and error messages through `QuangTranslationService`.
