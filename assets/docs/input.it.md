# QuangInputComponent

The `QuangInputComponent` must be configured using the `componentType` input property.

## Supported Types

- text
- textarea
- password
- email
- number
- url
- search
- tel
- color

## Inputs

- `componentType`: `'text' | 'textarea' | 'password' | 'email' | 'number' | 'url' | 'search' | 'tel' | 'color'` — Specifies the type of input. **(Required)**
- `maxLengthText`: `number | null` — Maximum length for text input.
- `minLengthText`: `number | null` — Minimum length for text input.
- `minNumber`: `number | undefined` — Minimum value for number input.
- `maxNumber`: `number | undefined` — Maximum value for number input.
- `componentStep`: `number` — Step for number input. Default: `1`.
- `resizable`: `boolean` — If false, disables textarea resizing. Default: `true` (only for textarea).
- All standard form/label/validation-related inputs inherited from `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Outputs

- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`

## Usage

```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.input"
  componentType="text"
  formControlName="testInput"
/>

<quang-input
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  [maxNumber]="10"
  [minNumber]="0"
  componentLabel="form.label.input"
  componentType="number"
  formControlName="testInput"
  successMessage="form.label.success"
/>
```

## Notes

This component extends the `QuangBaseComponent` and inherits its features, such as label and validation messages.
