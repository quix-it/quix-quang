# QuangSelectComponent

The `QuangSelectComponent` supports single or multiple selections from a dropdown list.


## Input

- `selectOptions`: `SelectOption[]` — Array of options to display in the dropdown (required)
- `selectionMode`: `'single' | 'multiple'` — Selection mode (default: 'single')

All standard inputs inherited from `QuangBaseComponent`:
- `isReadonly`: `boolean` — Makes the select read-only
- `componentLabel`: `string` — Label text (supports i18n keys)
- `componentPlaceholder`: `string` — Placeholder text (supports i18n keys)
- `componentTabIndex`: `number` — Tab index for accessibility
- `componentClass`: `string` — Additional CSS classes
- `errorMap`: `ErrorData[]` — Validation error messages
- `successMessage`: `string` — Success message text
- `helpMessage`: `string` — Help text displayed below the select
- `helpMessageTooltip`: `boolean` — If true, displays help message as a tooltip (with projected icon); if false, displays help message inline below the select. Default: `false`
- `formControl`: `FormControl` — Angular reactive form control
- Tooltip icon projection: to display the tooltip icon, use `<ng-content select="[help-icon]" />` in the component template.

## Output

- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`: emitted when the select loses focus


## Usage

### Single Selection
```html
<quang-select
  [errorMap]="errors"
  [selectOptions]="stringList"
  componentLabel="form.label.select"
  componentPlaceholder="Select an option"
  formControlName="testInput"
  selectionMode="single"
>
</quang-select>
```

### Multiple Selection
```html
<quang-select
  [errorMap]="errors"
  [selectOptions]="numberList"
  componentLabel="form.label.multipleSelect"
  componentPlaceholder="Select multiple options"
  formControlName="testInputMultiple"
  selectionMode="multiple"
>
</quang-select>
```

### Template-based options

Each `SelectOption` can provide a `renderer` (similar to `quang-table` and `quang-radio-group`), which is used instead of the plain label.

```html
<ng-template
  #customOption
  let-opt
  let-selected="selected"
>
  <span>
    <strong>{{ opt.label }}</strong>
    <small class="text-muted">selected: {{ selected }}</small>
  </span>
</ng-template>

<quang-select
  [selectOptions]="templatedOptions"
  formControlName="testInput"
/>
```

```ts
import { TemplateRef, viewChild } from '@angular/core'
import { SelectOption, QuangSelectOptionTemplateContext } from 'quang/components/shared'

customOptionTemplate = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('customOption')

templatedOptions: SelectOption[] = [
  { value: 'IT', label: 'Italy' },
  { value: 'FR', label: 'France', renderer: this.customOptionTemplate() },
]
```

### Inline Help Message
```html
<quang-select
  [selectOptions]="stringList"
  componentLabel="form.label.select"
  helpMessage="form.help.select"
  [helpMessageTooltip]="false"
  formControlName="testInput"
>
</quang-select>
```

### Tooltip Help Message
```html
<quang-select
  [selectOptions]="stringList"
  componentLabel="form.label.select"
  helpMessage="form.help.select"
  [helpMessageTooltip]="true"
  formControlName="testInput"
>
  <span help-icon class="ms-1"><i class="fas fa-question-circle"></i></span>
</quang-select>
```

## QuangTranslationService Integration

The component supports automatic translation of all labels, help messages, and error messages through `QuangTranslationService`.
