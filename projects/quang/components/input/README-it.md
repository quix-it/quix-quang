# Componente QuangInput

Il `QuangInputComponent` deve essere configurato tramite la proprietà di input `componentType`.

## Tipi Supportati

Il componente supporta i seguenti tipi di input, ognuno con comportamenti e configurazioni specifiche:

### Tipi di Input Testuali
- **text** — Input di testo standard per l'inserimento di testo generico
- **email** — Input email con validazione email integrata
- **password** — Input password con funzionalità opzionale di mostra/nascondi
- **url** — Input URL con validazione del formato URL
- **search** — Input di ricerca con comportamento di ricerca nativo
- **tel** — Input per numero di telefono

### Tipi di Input Numerici
- **number** — Input numerico con controlli step e validazione min/max

### Tipi di Input Speciali
- **textarea** — Input di testo multi-linea con funzionalità ridimensionabile
- **color** — Input per selezione colore

### Funzionalità Specifiche per Tipo

#### Textarea (`componentType="textarea"`)
- **Supporto multi-linea**: Si espande automaticamente per il contenuto
- **Controllo ridimensionamento**: Usa l'input `resizable` per abilitare/disabilitare il ridimensionamento manuale
- **Nessun vincolo numerico**: Gli input relativi ai numeri vengono ignorati

#### Password (`componentType="password"`)
- **Toggle visibilità**: Funzionalità integrata di mostra/nascondi password
- **Supporto icone**: Icone personalizzate tramite content projection
- **Sicurezza**: Maschera l'input di default, rivela al toggle

#### Number (`componentType="number"`)
- **Controlli step**: Usa `componentStep` per definire valori di incremento/decremento
- **Validazione range**: Imposta `minNumber` e `maxNumber` per vincoli di valore
- **Supporto decimali**: Supporta valori decimali quando lo step lo permette

#### Email (`componentType="email"`)
- **Validazione formato**: Validazione automatica del formato email
- **Autocomplete**: Migliorato con autocomplete specifico per email

#### Search (`componentType="search"`)
- **Pulsante clear**: Funzionalità di cancellazione nativa sui browser supportati
- **Comportamento search**: Miglioramenti di ricerca specifici della piattaforma

## Input

### Configurazione Principale
- `componentType`: `'text' | 'textarea' | 'password' | 'email' | 'number' | 'url' | 'search' | 'tel' | 'color'` — Specifica il tipo di input. **(Obbligatorio)**

### Input Specifici per Testo
- `maxLengthText`: `number | null` — Lunghezza massima per input di testo. Si applica a: `text`, `textarea`, `email`, `password`, `url`, `search`, `tel`
- `minLengthText`: `number | null` — Lunghezza minima per input di testo. Si applica a: `text`, `textarea`, `email`, `password`, `url`, `search`, `tel`

### Input Specifici per Numeri
- `minNumber`: `number | undefined` — Valore minimo per input numerico. **Si applica solo a**: `number`
- `maxNumber`: `number | undefined` — Valore massimo per input numerico. **Si applica solo a**: `number`
- `componentStep`: `number` — Incremento step per input numerico. Default: `1`. **Si applica solo a**: `number`

### Input Specifici per Textarea
- `resizable`: `boolean` — Controlla il comportamento di ridimensionamento della textarea. Default: `true`. **Si applica solo a**: `textarea`
  - `true`: L'utente può ridimensionare manualmente la textarea
  - `false`: La dimensione della textarea è fissa (aggiunge la classe `no-resize`)

### Input Specifici per Password
- `showHidePasswordButton`: `boolean` — Mostra/nasconde il pulsante di toggle della password. Default: `true`. **Si applica solo a**: `password`
- `buttonClass`: `string` — Classi CSS aggiuntive per il pulsante di toggle della password. **Si applica solo a**: `password`

### Input Universali
Tutti i tipi di input ereditano questi input standard da `QuangBaseComponent`:
- `isReadonly`: `boolean` — Rende l'input di sola lettura
- `componentLabel`: `string` — Testo dell'etichetta (supporta chiavi i18n)
- `componentPlaceholder`: `string` — Testo placeholder (supporta chiavi i18n)
- `componentTabIndex`: `number` — Indice tab per l'accessibilità
- `componentClass`: `string` — Classi CSS aggiuntive per l'elemento input
- `errorMap`: `Record<string, any>` — Messaggi di errore di validazione
- `successMessage`: `string` — Testo del messaggio di successo
- `helpMessage`: `string` — Testo di aiuto visualizzato sotto l'input
- `formControl`: `FormControl` — Controllo form reattivo di Angular

## Output

- `showPassword`: `EventEmitter<boolean>` — Emesso quando la visibilità della password viene modificata (solo per input di tipo password).
- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`

## Esempio d'uso

### Input di Testo Base
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.input"
  componentType="text"
  formControlName="testInput"
/>
```

### Input Numerico con Vincoli
```html
<quang-input
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  [maxNumber]="100"
  [minNumber]="0"
  [componentStep]="5"
  componentLabel="form.label.quantity"
  componentType="number"
  formControlName="quantity"
  successMessage="form.label.success"
/>
```

### Textarea con Controllo Dimensioni
```html
<!-- Textarea ridimensionabile -->
<quang-input
  [errorMap]="errors()"
  [maxLengthText]="500"
  [resizable]="true"
  componentLabel="form.label.description"
  componentType="textarea"
  formControlName="description"
  helpMessage="form.help.maxChars"
/>

<!-- Textarea a dimensione fissa -->
<quang-input
  [errorMap]="errors()"
  [resizable]="false"
  componentLabel="form.label.comment"
  componentType="textarea"
  formControlName="comment"
/>
```

### Input Email con Validazione
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.email"
  componentType="email"
  formControlName="email"
  componentPlaceholder="form.placeholder.email"
/>
```

### Input Password con Toggle
```html
<!-- Password con pulsante di toggle -->
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

<!-- Password senza pulsante di toggle -->
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
  [showHidePasswordButton]="false"
/>
```

### Input URL
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.website"
  componentType="url"
  formControlName="website"
  componentPlaceholder="form.placeholder.url"
/>
```

### Input di Ricerca
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.search"
  componentType="search"
  formControlName="searchTerm"
  componentPlaceholder="form.placeholder.search"
/>
```

### Input Telefono
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.phone"
  componentType="tel"
  formControlName="phone"
  componentPlaceholder="form.placeholder.phone"
/>
```

### Input Colore
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.color"
  componentType="color"
  formControlName="favoriteColor"
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
