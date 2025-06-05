# Componente QuangInput

Il `QuangInputComponent` deve essere configurato tramite la proprietà di input `componentType`.

## Tipi Supportati

- text
- textarea
- password
- email
- number
- url
- search
- tel
- color

## Input

- `componentType`: `'text' | 'textarea' | 'password' | 'email' | 'number' | 'url' | 'search' | 'tel' | 'color'` — Specifica il tipo di input. **(Obbligatorio)**
- `maxLengthText`: `number | null` — Lunghezza massima per l'input di testo.
- `minLengthText`: `number | null` — Lunghezza minima per l'input di testo.
- `minNumber`: `number | undefined` — Valore minimo per l'input numerico.
- `maxNumber`: `number | undefined` — Valore massimo per l'input numerico.
- `componentStep`: `number` — Step per l'input numerico. Default: `1`.
- `resizable`: `boolean` — Se false, disabilita il ridimensionamento della textarea. Default: `true` (solo per textarea).
- Tutti gli input standard di form/etichetta/validazione ereditati da `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`

## Esempio d'uso

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

## Note

Questo componente estende `QuangBaseComponent` ed eredita tutte le sue funzionalità, come etichette e messaggi di validazione.
