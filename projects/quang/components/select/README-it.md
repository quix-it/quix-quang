# Componente QuangSelect

Il `QuangSelectComponent` supporta la selezione singola o multipla da un elenco a discesa.


## Input

- `selectOptions`: `SelectOption[]` — Array di opzioni da mostrare nel menu a discesa (obbligatorio)
- `selectionMode`: `'single' | 'multiple'` — Modalità di selezione (default: 'single')

Tutti gli input standard ereditati da `QuangBaseComponent`:
- `isReadonly`: `boolean` — Rende il select di sola lettura
- `componentLabel`: `string` — Etichetta (supporta chiavi i18n)
- `componentPlaceholder`: `string` — Placeholder (supporta chiavi i18n)
- `componentTabIndex`: `number` — Indice tab per accessibilità
- `componentClass`: `string` — Classi CSS aggiuntive
- `errorMap`: `ErrorData[]` — Messaggi errore validazione
- `successMessage`: `string` — Messaggio di successo
- `helpMessage`: `string` — Messaggio di aiuto visualizzato sotto il select
- `helpMessageTooltip`: `boolean` — Se true, mostra il messaggio di aiuto come tooltip (con icona proiettata); se false, mostra il messaggio inline sotto il select. Default: `false`
- `formControl`: `FormControl` — Controllo form reattivo Angular
- Visualizzazione icona tooltip: per visualizzare l'icona del tooltip, usa `<ng-content select="[help-icon]" />` nel template del componente.

## Output

- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`: emesso quando il select perde il focus


## Utilizzo

### Selezione Singola
```html
<quang-select
  [errorMap]="errors()"
  [selectOptions]="stringList"
  componentLabel="form.label.select"
  componentPlaceholder="Seleziona un'opzione"
  formControlName="testInput"
  selectionMode="single"
>
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
  selectionMode="multiple"
>
</quang-select>
```

### Messaggio di Aiuto Inline
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

### Messaggio di Aiuto Tooltip
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


## Integrazione QuangTranslationService

Il componente supporta la traduzione automatica di tutte le etichette, messaggi di aiuto e messaggi di errore tramite `QuangTranslationService`.
