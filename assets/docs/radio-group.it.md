# QuangRadioGroupComponent

Il `QuangRadioGroupComponent` renderizza una lista di radio button con supporto ai reactive forms.

## Opzioni standard

```html
<form [formGroup]="form">
  <quang-radio-group
    [radioOptions]="options"
    componentLabel="Radio group"
    formControlName="choice"
  />
</form>
```

```ts
import { FormControl, FormGroup } from '@angular/forms'
import { RadioOption } from 'quang/components/radio-group'

form = new FormGroup({
  choice: new FormControl<string | null>(null),
})

options: RadioOption[] = [
  { label: 'Opzione A', value: 'A' },
  { label: 'Opzione B', value: 'B' },
]
```

## Opzioni con template

Come `quang-table`, ogni opzione può fornire un template `renderer`.

```html
<ng-template #optTpl let-opt let-selected="selected">
  <span class="d-flex gap-2 align-items-center">
    <strong>Custom {{ opt.value }}</strong>
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

optTpl = viewChild<TemplateRef<QuangRadioOptionTemplateContext>>('optTpl')

templatedOptions: RadioOption[] = [
  { value: 'A', label: 'Opzione A' },
  { value: 'B', renderer: this.optTpl() },
]
```
