# Componente QuangCheckbox

Il `QuangCheckboxComponent` può essere utilizzato come checkbox standard o come interruttore toggle impostando l'input `checkType`.

## Funzionalità

- Funzionalità standard di checkbox
- Modalità interruttore toggle
- Posizione dell'etichetta configurabile
- Feedback di validazione (messaggi di successo ed errore)

## Input

- `checkType`: `'checkbox' | 'toggle'` — Specifica il tipo di componente. **(Obbligatorio)**
- `labelPosition`: `'top' | 'left' | 'right' | 'bottom'` — Posizione dell'etichetta. Default: `'top'`.
- `removeMargin`: `boolean` — Rimuove il margine di default. Default: `false`.
- Tutti gli input standard di form/etichetta/validazione ereditati da `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- `changedHandler`: Emette il nuovo valore quando lo stato della checkbox cambia.
- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`

## Esempio d'uso

```html
<quang-checkbox
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  checkType="checkbox"
  class="col-3"
  componentLabel="form.label.toggle"
  formControlName="toggle"
  labelPosition="top"
  successMessage="form.label.success"
/>
<quang-checkbox
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  checkType="toggle"
  class="col-6"
  componentLabel="form.label.checkbox"
  formControlName="checkbox"
  labelPosition="left"
  successMessage="form.label.success"
/>
```

## Stili

Il componente supporta le seguenti classi CSS per la personalizzazione:

- `.label-top`: Posiziona l'etichetta sopra la checkbox.
- `.label-bottom`: Posiziona l'etichetta sotto la checkbox.
- `.label-left`: Posiziona l'etichetta a sinistra della checkbox.
- `.label-right`: Posiziona l'etichetta a destra della checkbox.
- `.toggle-wrapper`: Applica lo stile di interruttore toggle.

## Note

Questo componente estende `QuangBaseComponent` ed eredita tutte le sue funzionalità, come etichette, messaggi di errore e messaggi di successo.
