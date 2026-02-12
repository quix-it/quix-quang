# QuangRadioGroupComponent

The `QuangRadioGroupComponent` renders a group of radio buttons with full Angular forms support (ControlValueAccessor).

## Input

- `radioOptions`: `RadioOption[]` - Array of options to render (required)
- `radioPosition`: `'left' | 'right'` - Render the radio control on the left or right of the label (default: `'left'`)
- `name`: `string` - Radio group name attribute. Defaults to `componentId`.

All standard inputs inherited from `QuangBaseComponent`: `isReadonly`, `componentLabel`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

All standard outputs inherited from `QuangBaseComponent`: `componentBlur`

## Usage

### Standard options

```html
<quang-radio-group
  [errorMap]="errors()"
  [radioOptions]="options"
  componentLabel="form.label.radioGroup"
  formControlName="choice"
/>
```

```ts
import { RadioOption } from 'quang/components/radio-group'

options: RadioOption[] = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
]
```

### Template-based options

Each `RadioOption` can provide a `renderer` (similar to `quang-table`), which is used instead of the plain label.

```html
<ng-template
  #customOption
  let-opt
  let-selected="selected"
>
  <span class="d-flex gap-2 align-items-center">
    <strong>{{ opt.value }}</strong>
    <small class="text-muted">selected: {{ selected }}</small>
  </span>
</ng-template>

<quang-radio-group
  [radioOptions]="templatedOptions"
  formControlName="choice"
/>
```

```ts
import { TemplateRef, viewChild } from '@angular/core'
import { RadioOption, QuangRadioOptionTemplateContext } from 'quang/components/radio-group'

templatedOptions: RadioOption[] = [
  { value: 'A', label: 'Option A' },
  { value: 'B', renderer: this.customOptionTemplate() },
]

customOptionTemplate = viewChild<TemplateRef<QuangRadioOptionTemplateContext>>('customOption')
```

## Notes

Most components are styled based on Bootstrap v5.3 and extend `QuangBaseComponent`.
