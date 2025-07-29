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

## Integrazione QuangTranslationService

Il componente supporta la traduzione automatica di tutte le etichette, messaggi di aiuto e messaggi di errore tramite `QuangTranslationService`.
