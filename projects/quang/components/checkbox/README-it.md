# Componente QuangCheckbox

Il `QuangCheckboxComponent` è un componente versatile per checkbox e interruttori toggle che offre posizionamento flessibile delle etichette, feedback di validazione completo e integrazione perfetta con i form Angular. Supporta sia modalità checkbox tradizionale che interruttore toggle moderno con opzioni di personalizzazione estese.

## Input

- `checkType`: `'checkbox' | 'toggle'` — Specifica il tipo di input. Checkbox viene visualizzato come input tradizionale, toggle come interruttore moderno. **(Obbligatorio)**
- `labelPosition`: `'top' | 'left' | 'right' | 'bottom'` — Posizione dell'etichetta rispetto al controllo. Influenza layout e spaziatura. Default: `'top'`
- `removeMargin`: `boolean` — Rimuove il margine inferiore e la classe form-check di default. Utile per layout personalizzati o spaziature ridotte. Default: `false`
- `isReadonly`: `boolean` — Imposta il componente in sola lettura. Ereditato da `QuangBaseComponent`
- `componentLabel`: `string` — Testo etichetta per il componente. Ereditato da `QuangBaseComponent`
- `componentPlaceholder`: `string` — Testo placeholder per l'input. Ereditato da `QuangBaseComponent`
- `componentTabIndex`: `number` — Indice tab per accessibilità. Ereditato da `QuangBaseComponent`
- `componentClass`: `string | string[]` — Classi CSS aggiuntive. Ereditato da `QuangBaseComponent`
- `errorMap`: `ErrorData[]` — Messaggi di errore personalizzati. Ereditato da `QuangBaseComponent`
- `successMessage`: `string` — Messaggio di successo da visualizzare. Ereditato da `QuangBaseComponent`
- `helpMessage`: `string` — Testo di aiuto visualizzato come tooltip o sotto l'input. Ereditato da `QuangBaseComponent`
- `helpMessageTooltip`: `boolean` — Se true, il messaggio di aiuto viene mostrato come tooltip (con icona); se false, il messaggio di aiuto viene mostrato inline sotto l'input. Predefinito: `false`. Ereditato da `QuangBaseComponent`
- `formControl`: `FormControl` — Controllo form per form reattivi. Ereditato da `QuangBaseComponent`

## Output

- `changedHandler`: `EventEmitter<boolean>` — Emesso quando lo stato della checkbox cambia. Fornisce il nuovo valore booleano (true per selezionato, false per deselezionato)
- `componentBlur`: `EventEmitter<void>` — Emesso quando il componente perde il focus. Ereditato da `QuangBaseComponent`

## Utilizzo

### Checkbox Base
```html
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.agreeToTerms"
  formControlName="agreeToTerms"
/>
```

### Messaggio di aiuto come Tooltip
```html
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.agreeToTerms"
  [helpMessage]="'form.help.agreeToTerms'"
  [helpMessageTooltip]="true"
  formControlName="agreeToTerms"
>
  <svg-icon src="assets/icons/svg/help.svg" help-icon />
</quang-checkbox>
```

### Messaggio di aiuto Inline
```html
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.agreeToTerms"
  [helpMessage]="'form.help.agreeToTerms'"
  [helpMessageTooltip]="false"
  formControlName="agreeToTerms"
/>
```

### Interruttore Toggle
```html
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.enableNotifications"
  labelPosition="left"
  formControlName="notifications"
/>
```

#### Esempio TypeScript
```typescript
export class MyComponent {
  form = this.fb.group({
    agreeToTerms: [false, Validators.requiredTrue],
    enableNotifications: [true]
  })

  onToggleChange(isChecked: boolean): void {
    console.log('Stato checkbox cambiato:', isChecked)
    // Gestisci il cambio di stato
  }
}
```

### Integrazione Traduzione

Il componente usa QuangTranslationService per tutto il contenuto testuale:

- **Traduzione Automatica**: Tutte le etichette, i testi di aiuto e i messaggi di errore sono tradotti automaticamente
- **Supporto Chiavi**: Usa chiavi di traduzione per tutto il contenuto testuale
- **Gestione Fallback**: Visualizzazione fallback quando le traduzioni non sono disponibili
- **Lingua Dinamica**: Risponde ai cambi di lingua senza ricaricare il componente
