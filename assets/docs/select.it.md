# Componente QuangSelect

Il `QuangSelectComponent` supporta la selezione singola o multipla da un elenco a discesa.

## Input

- `selectOptions`: `SelectOption[]` - Array di opzioni da mostrare nel menu a discesa (obbligatorio)
- `selectionMode`: `'single' | 'multiple'` - Modalità di selezione (default: 'single')

Tutti gli input standard ereditati da `QuangBaseComponent`: `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

Tutti gli output standard ereditati da `QuangBaseComponent`: `componentBlur`

## Utilizzo

### Selezione Singola
```html
<quang-select
  [errorMap]="errors()"
  [selectOptions]="stringList"
  componentLabel="form.label.select"
  componentPlaceholder="Seleziona un'opzione"
  formControlName="testInput"
  selectionMode="single">
</quang-select>
```

### Selezione Multipla
```html
<quang-select
  [errorMap]="errors()"
  [selectOptions]="numberList"
  componentLabel="form.label.multipleSelect"
  componentPlaceholder="Seleziona opzioni multiple"
  formControlName="testInputMultiple"
  selectionMode="multiple">
</quang-select>
```

### Opzioni con template

Ogni `SelectOption` può fornire un `renderer` (simile a `quang-table` e `quang-radio-group`), che viene utilizzato al posto dell’etichetta standard.

```html
<ng-template
  #customOption
  let-opt
  let-selected="selected"
>
  <span>
    <strong>{{ opt.label }}</strong>
    <small class="text-muted">selezionato: {{ selected }}</small>
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

## Integrazione QuangTranslationService

Il componente supporta la traduzione automatica di tutte le etichette, messaggi di aiuto e messaggi di errore tramite `QuangTranslationService`.
