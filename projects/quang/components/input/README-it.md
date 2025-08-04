# QuangInputComponent

Il `QuangInputComponent` deve essere configurato utilizzando la proprietà di input `componentType`.

## Tipi supportati

Il componente supporta i seguenti tipi di input, ciascuno con comportamenti e configurazioni specifici:

### Tipi di input testuali

- **text** — Input di testo standard per l'inserimento generale di testo
- **email** — Input e-mail con validazione e-mail integrata
- **password** — Input password con funzionalità opzionale di mostra/nascondi
- **url** — Input URL con validazione del formato URL
- **search** — Input di ricerca con comportamento di ricerca nativo
- **tel** — Input numero di telefono

### Tipi di input numerici

- **number** — Input numerico con controlli di passo e validazione min/max

### Tipi di input speciali

- **textarea** — Input di testo multi-linea con funzionalità di ridimensionamento
- **color** — Input per la selezione del colore

### Funzionalità specifiche per tipo

#### Textarea (`componentType="textarea"`)

- **Supporto multi-linea**: si espande automaticamente per il contenuto
- **Controllo ridimensionabile**: utilizza l'input `resizable` per abilitare/disabilitare il ridimensionamento manuale
- **Nessun vincolo di numero min/max**: gli input relativi ai numeri vengono ignorati

#### Password (`componentType="password"`)

- **Visibilità a levetta**: funzionalità integrata di mostra/nascondi password
- **Supporto icone**: utilizza la proiezione di contenuto tramite slot per personalizzare le icone mostra/nascondi
  - Slot `[show-password]`: Contenuto da visualizzare quando la password è nascosta (icona mostra password)
  - Slot `[hide-password]`: Contenuto da visualizzare quando la password è visibile (icona nascondi password)
- **Sicurezza**: maschera l'input per impostazione predefinita, rivela all'attivazione

#### Number (`componentType="number"`)

- **Controlli di passo**: utilizza `componentStep` per definire i valori di incremento/decremento
- **Validazione intervallo**: imposta `minNumber` e `maxNumber` per i vincoli di valore
- **Supporto decimali**: supporta valori decimali quando il passo lo consente

#### Email (`componentType="email"`)

- **Validazione formato**: validazione automatica del formato e-mail
- **Completamento automatico**: migliorato con il completamento automatico specifico per e-mail

#### Search (`componentType="search"`)

- **Pulsante Cancella**: funzionalità di cancellazione nativa sui browser supportati
- **Comportamento di ricerca**: miglioramenti della ricerca specifici della piattaforma

## Input

### Configurazione Core

- `componentType`: `'text' | 'textarea' | 'password' | 'email' | 'number' | 'url' | 'search' | 'tel' | 'color'` — Specifica il tipo di input. **(Obbligatorio)**

### Input specifici per il testo

- `maxLengthText`: `number | null` — Lunghezza massima per l'input di testo. Si applica a: `text`, `textarea`, `email`, `password`, `url`, `search`, `tel`
- `minLengthText`: `number | null` — Lunghezza minima per l'input di testo. Si applica a: `text`, `textarea`, `email`, `password`, `url`, `search`, `tel`

### Input specifici per i numeri

- `minNumber`: `number | undefined` — Valore minimo per l'input numerico. **Si applica solo a**: `number`
- `maxNumber`: `number | undefined` — Valore massimo per l'input numerico. **Si applica solo a**: `number`
- `componentStep`: `number` — Incremento di passo per l'input numerico. Predefinito: `1`. **Si applica solo a**: `number`

### Input specifici per Textarea

- `resizable`: `boolean` — Controlla il comportamento di ridimensionamento della textarea. Predefinito: `true`

### Input specifici per Password

- `showHidePasswordButton`: `boolean` — Mostra/nasconde il pulsante di attivazione/disattivazione della password. Predefinito: `true`. **Si applica solo a**: `password`
- `buttonClass`: `string` — Classi CSS aggiuntive per il pulsante di attivazione/disattivazione della password. **Si applica solo a**: `password`


### Input universali

- `isReadonly`: `boolean` — Rende l'input di sola lettura
- `componentLabel`: `string` — Testo dell'etichetta (supporta chiavi i18n)
- `componentPlaceholder`: `string` — Testo del segnaposto (supporta chiavi i18n)
- `componentTabIndex`: `number` — Indice di tabulazione per l'accessibilità
- `componentClass`: `string` — Classi CSS aggiuntive per l'elemento di input
- `errorMap`: `ErrorData[]` — Messaggi di errore di validazione
- `successMessage`: `string` — Testo del messaggio di successo
- `helpMessage`: `string` — Testo di aiuto visualizzato come tooltip o sotto l'input
- `helpMessageTooltip`: `boolean` — Se true, il messaggio di aiuto viene mostrato come tooltip (con icona); se false, il messaggio di aiuto viene mostrato inline sotto l'input. Predefinito: `false`
- `formControl`: `FormControl` — Controllo di form reattivo di Angular
- Visualizzazione icona tooltip: per visualizzare l'icona del tooltip, usa `<ng-content select="[help-icon]" />` nel template del componente.

## Output

- `showPassword`: `EventEmitter<boolean>` — Emesso quando la visibilità della password viene attivata/disattivata (solo input password)
- `componentBlur`: `EventEmitter<void>` — Emesso quando l'input perde il focus

## Utilizzo

### Input di testo di base

```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.input"
  componentType="text"
  formControlName="testInput"
/>
```

### Input Password con pulsante mostra/nascondi

```html
<quang-input
  [errorMap]="errors()"
  [showHidePasswordButton]="true"
  (showPassword)="onToggleShowPassword($event)"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
>
  <!-- Contenuto per il pulsante mostra/nascondi password -->
  <svg-icon
    show-password
    src="assets/icons/svg/visibility.svg"
  />
  <svg-icon
    hide-password
    src="assets/icons/svg/visibility_off.svg"
  />
</quang-input>
```

#### Esempio TypeScript

```typescript
export class MyComponent {
  showPassword = signal<boolean>(false)

  onToggleShowPassword(isVisible: boolean): void {
    this.showPassword.set(isVisible)
  }

  errors(): Record<string, any> {
    return this.form.get('password')?.errors ?? {}
  }
}
```

### Input numerico con vincoli

```html
<quang-input
  [componentStep]="5"
  [errorMap]="errors()"
  [maxNumber]="100"
  [minNumber]="0"
  componentLabel="form.label.quantity"
  componentType="number"
  formControlName="quantity"
/>
```

### Textarea

```html
<quang-input
  [errorMap]="errors()"
  [maxLengthText]="500"
  componentLabel="form.label.description"
  componentType="textarea"
  formControlName="description"
/>
```

### Password Input con pulsante mostra password

```html
<quang-input
  [errorMap]="errors()"
  [showHidePasswordButton]="true"
  (showPassword)="onToggleShowPassword($event)"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
>
  @if (showPassword()) {
  <svg-icon src="assets/icons/svg/visibility_off.svg" />
  } @else {
  <svg-icon src="assets/icons/svg/visibility.svg" />
  }
</quang-input>
```

#### TypeScript Example

```typescript
export class MyComponent {
  showPassword = signal<boolean>(false)

  onToggleShowPassword(isVisible: boolean): void {
    this.showPassword.set(isVisible)
  }

  errors(): Record<string, any> {
    return this.form.get('password')?.errors ?? {}
  }
}
```

### Funzionalità specifiche per tipo

Il componente supporta vari tipi di input con comportamenti specifici:

- **text, email, url, search, tel**: Supportano i vincoli di lunghezza del testo
- **password**: Funzionalità integrata di mostra/nascondi password con supporto icone
- **number**: Controlli di passo e validazione min/max
- **textarea**: Supporto multi-linea con controllo ridimensionabile
- **color**: Input per la selezione del colore
