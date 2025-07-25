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
- `showHidePasswordButton`: `boolean` — Mostra/nasconde il pulsante di toggle per la password quando `componentType` è 'password'. Default: `true`.
- `buttonClass`: `string` — Classi CSS aggiuntive per il pulsante di toggle della password.
- Tutti gli input standard di form/etichetta/validazione ereditati da `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- `showPassword`: `EventEmitter<boolean>` — Emesso quando la visibilità della password viene modificata (solo per input di tipo password).
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

<!-- Input password con pulsante di toggle -->
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
  [showHidePasswordButton]="true"
  (showPassword)="onToggleShowPassword($event)"
>
  <!-- Icona per il pulsante di toggle della password -->
  @if (showPassword()) {
    <svg-icon src="assets/icons/svg/visibility_off.svg" />
  } @else {
    <svg-icon src="assets/icons/svg/visibility.svg" />
  }
</quang-input>

<!-- Input password senza pulsante di toggle -->
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
  [showHidePasswordButton]="false"
/>
```

## Note

Questo componente estende `QuangBaseComponent` ed eredita tutte le sue funzionalità, come etichette e messaggi di validazione.

### Funzionalità Toggle Password

Quando si utilizza `componentType="password"`, è possibile aggiungere un pulsante mostra/nascondi password:

1. Impostando `showHidePasswordButton="true"` (default)
2. Fornendo un'icona tramite content projection utilizzando `<ng-content></ng-content>`
3. Ascoltando l'evento di output `showPassword` per tracciare lo stato di visibilità
4. Il pulsante apparirà/scomparirà automaticamente in base a:
   - Il tipo di input che è 'password'
   - L'input `showHidePasswordButton` che è true
   - L'input non è disabilitato

#### Caratteristiche:
- **Funzionalità Toggle**: Cambia il tipo di input tra 'password' e 'text'
- **Emissione Eventi**: Emette l'evento `showPassword` con lo stato di visibilità corrente
- **Supporto Icone Flessibile**: Usa qualsiasi libreria di icone tramite content projection
- **Accessibilità**: Include etichette ARIA appropriate per screen reader
- **Supporto Validazione**: Il pulsante toggle eredita gli stili di validazione (bordi successo/errore)

#### Esempio con Gestione Stato basata su Signal:
```typescript
// Componente TypeScript
showPassword = signal<boolean>(false);

onToggleShowPassword(isVisible: boolean): void {
  this.showPassword.set(isVisible);
}
```
