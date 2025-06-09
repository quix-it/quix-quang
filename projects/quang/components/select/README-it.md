# Componente QuangSelect

Il `QuangSelectComponent` supporta la selezione singola o multipla da un elenco a discesa.

## Funzionalità

- Selezione singola
- Selezione multipla
- Opzioni personalizzabili

## Input

- `selectOptions`: `SelectOption[]` — Array di opzioni da mostrare nel menu a discesa. **(Obbligatorio)**
- `selectionMode`: `'single' | 'multiple'` — Abilita la modalità selezione singola o multipla. Default: `'single'`.
- Tutti gli input standard di form/etichetta/validazione ereditati da `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`

## Esempio d'uso

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

## Note

Questo componente estende `QuangBaseComponent` ed eredita tutte le sue funzionalità, come etichette e messaggi di validazione.
