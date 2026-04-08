# Componente QuangCheckbox

Il `QuangCheckboxComponent` è un componente versatile per checkbox e interruttori toggle che fornisce posizionamento flessibile delle etichette, feedback di validazione completo e integrazione perfetta con i form Angular. Supporta sia modalità checkbox tradizionale che interruttore toggle moderno con opzioni di personalizzazione estese.

## Input

- `checkType`: `'checkbox' | 'toggle'` - Tipo di input (default: 'checkbox')
- `labelPosition`: `'top' | 'left' | 'right' | 'bottom'` - Posizione dell'etichetta (default: 'top')
- `removeMargin`: `boolean` - Rimuove margine inferiore default (default: false)

Tutti gli input standard ereditati da `QuangBaseComponent`: `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- `changedHandler`: `EventEmitter<boolean>` - Emesso quando lo stato cambia

Tutti gli output standard ereditati da `QuangBaseComponent`: `componentBlur`

## Utilizzo

### Checkbox Base
```html
<quang-checkbox
  checkType="checkbox"
  [errorMap]="errors()"
  componentLabel="form.label.agreeToTerms"
  formControlName="agreeToTerms">
</quang-checkbox>
```

### Interruttore Toggle
```html
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.enableNotifications"
  labelPosition="left"
  formControlName="notifications">
</quang-checkbox>
```

## Integrazione QuangTranslationService

Il componente supporta la traduzione automatica di tutte le etichette, messaggi di aiuto e messaggi di errore tramite `QuangTranslationService`.
