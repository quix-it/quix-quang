# Componente QuangCheckbox

Il `QuangCheckboxComponent` è un componente versatile per checkbox e interruttori toggle che fornisce posizionamento flessibile delle etichette, feedback di validazione completo e integrazione perfetta con i form Angular. Supporta sia modalità checkbox tradizionale che interruttore toggle moderno con opzioni di personalizzazione estese.

## Funzionalità Supportate

### Tipi di Input
- **Checkbox Standard**: Checkbox tradizionale con indicazione spunta
- **Interruttore Toggle**: Toggle moderno stile interruttore con animazione scorrevole
- **Stile Configurabile**: Adatta l'aspetto basato sul tipo selezionato
- **Gestione Stato**: Gestisce stati selezionato/deselezionato con integrazione form

### Posizionamento Etichetta
- **Posizionamento Superiore**: Etichetta sopra la checkbox/toggle (default)
- **Posizionamento Inferiore**: Etichetta sotto la checkbox/toggle
- **Posizionamento Sinistro**: Etichetta a sinistra dell'input
- **Posizionamento Destro**: Etichetta a destra dell'input
- **Layout Flessibile**: Posizionamento responsivo con allineamento appropriato

### Integrazione Form
- **Reactive Forms**: Supporto completo Angular reactive forms
- **Template-driven Forms**: Compatibile con template-driven forms
- **Visualizzazione Validazione**: Feedback visivo per stati validazione
- **Sincronizzazione Stato**: Sincronizzazione automatica valori con controlli form

### Funzionalità Accessibilità
- **Navigazione Tastiera**: Supporto completo tastiera con attivazione spazio/invio
- **Supporto Screen Reader**: Attributi ARIA appropriati e definizioni ruolo
- **Gestione Focus**: Indicatori focus chiari e ordine tab logico
- **Associazione Etichetta**: Associazione appropriata etichetta-input per accessibilità

### Internazionalizzazione
- **Supporto Traduzione**: Integrato con QuangTranslationService
- **Messaggi Localizzati**: Etichette, testo aiuto e messaggi validazione tradotti
- **Supporto RTL**: Compatibile con lingue da destra a sinistra

## Input

- `checkType`: `'checkbox' | 'toggle'` — Specifica il tipo di input. Checkbox renderizza come input spunta tradizionale, toggle renderizza come controllo interruttore moderno. **(Obbligatorio)**
- `labelPosition`: `'top' | 'left' | 'right' | 'bottom'` — Posizione dell'etichetta relativa al controllo input. Influenza direzione layout e spaziatura. Default: `'top'`
- `removeMargin`: `boolean` — Rimuove margine inferiore default e classe form-check. Utile per layout personalizzati o requisiti spaziatura stretta. Default: `false`
Tutti gli input standard ereditati da `QuangBaseComponent`: `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- `changedHandler`: `EventEmitter<boolean>` — Emesso quando stato checkbox cambia. Fornisce nuovo valore booleano (true per selezionato, false per deselezionato)
Tutti gli output standard ereditati da `QuangBaseComponent`: `componentBlur`

## Utilizzo

### Checkbox Base
```html
<quang-checkbox
  checkType="checkbox"
  [errorMap]="errors()"
  componentLabel="form.label.agreeToTerms"
  formControlName="agreeToTerms"
>
</quang-checkbox>
```

### Interruttore Toggle
```html
<quang-checkbox
  checkType="toggle"
  [errorMap]="errors()"
  componentLabel="form.label.enableNotifications"
  labelPosition="left"
  formControlName="notifications"
  successMessage="Impostazioni salvate con successo"
>
</quang-checkbox>
```

### Diverse Posizioni Etichetta
```html
<!-- Etichetta sopra (default) -->
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.topLabel"
  labelPosition="top"
  formControlName="topOption"
>
</quang-checkbox>

<!-- Etichetta sotto -->
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.bottomLabel"
  labelPosition="bottom"
  formControlName="bottomOption"
>
</quang-checkbox>

<!-- Etichetta a sinistra -->
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.leftLabel"
  labelPosition="left"
  formControlName="leftOption"
>
</quang-checkbox>

<!-- Etichetta a destra -->
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.rightLabel"
  labelPosition="right"
  formControlName="rightOption"
>
</quang-checkbox>
```

### Validazione e Testo Aiuto
```html
<quang-checkbox
  checkType="checkbox"
  [errorMap]="errors()"
  componentLabel="form.label.requiredConsent"
  helpMessage="form.help.consentExplanation"
  successMessage="form.success.consentGiven"
  formControlName="consent"
>
</quang-checkbox>
```

### Modalità Solo Lettura
```html
<quang-checkbox
  checkType="toggle"
  [isReadonly]="true"
  componentLabel="form.label.readonlyStatus"
  labelPosition="left"
  formControlName="status"
>
</quang-checkbox>
```

### Layout Personalizzato Senza Margini Default
```html
<div class="custom-checkbox-container">
  <quang-checkbox
    checkType="checkbox"
    [removeMargin]="true"
    componentLabel="form.label.customLayout"
    componentClass="custom-checkbox"
    formControlName="customOption"
  >
  </quang-checkbox>
</div>
```

### Gestione Eventi
```html
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.dynamicToggle"
  (changedHandler)="onToggleChange($event)"
  formControlName="dynamicOption"
>
</quang-checkbox>
```

#### TypeScript Gestione Eventi
```typescript
onToggleChange(isChecked: boolean): void {
  console.log('Stato toggle cambiato:', isChecked);
  
  if (isChecked) {
    // Gestisce stato selezionato
    this.enableFeature();
  } else {
    // Gestisce stato deselezionato
    this.disableFeature();
  }
}
```

### Checkbox Obbligatoria con Validazione
```html
<quang-checkbox
  checkType="checkbox"
  [errorMap]="errors()"
  componentLabel="form.label.mandatoryAgreement"
  helpMessage="form.help.mandatoryNote"
  formControlName="mandatoryConsent"
>
</quang-checkbox>
```

#### TypeScript per Validazione Obbligatoria
```typescript
form = this.fb.group({
  mandatoryConsent: [false, [Validators.requiredTrue]]
});

errors = computed(() => {
  const control = this.form.get('mandatoryConsent');
  if (control?.errors?.['required']) {
    return { mandatoryConsent: { message: 'Devi accettare per continuare' } };
  }
  return {};
});
```

### Checkbox Raggruppate
```html
<fieldset>
  <legend>Seleziona le tue preferenze</legend>
  
  <quang-checkbox
    checkType="checkbox"
    componentLabel="form.label.emailUpdates"
    labelPosition="right"
    formControlName="emailUpdates"
  >
  </quang-checkbox>
  
  <quang-checkbox
    checkType="checkbox"
    componentLabel="form.label.smsUpdates"
    labelPosition="right"
    formControlName="smsUpdates"
  >
  </quang-checkbox>
  
  <quang-checkbox
    checkType="checkbox"
    componentLabel="form.label.pushNotifications"
    labelPosition="right"
    formControlName="pushNotifications"
  >
  </quang-checkbox>
</fieldset>
```

### Toggle con Stati Personalizzati
```html
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.featureEnabled"
  labelPosition="left"
  [errorMap]="toggleErrors()"
  (changedHandler)="onFeatureToggle($event)"
  formControlName="featureEnabled"
>
</quang-checkbox>
```

#### TypeScript per Logica Toggle Personalizzata
```typescript
onFeatureToggle(enabled: boolean): void {
  if (enabled) {
    // Controlla se utente ha permesso
    if (!this.userHasPermission()) {
      // Previene abilitazione se non ha permesso
      this.form.patchValue({ featureEnabled: false });
      this.showPermissionError();
      return;
    }
    this.activateFeature();
  } else {
    this.deactivateFeature();
  }
}

toggleErrors = computed(() => {
  if (this.permissionError()) {
    return { 
      featureEnabled: { 
        message: 'Permessi insufficienti per abilitare questa funzionalità' 
      } 
    };
  }
  return {};
});
```

## Comportamento Componente

### Tipi di Input

#### Tipo Checkbox
- **Aspetto Visivo**: Checkbox quadrata tradizionale con spunta
- **Interazione Utente**: Clicca per commutare, tastiera spazio/invio per attivare
- **Valore Form**: Booleano (true/false)
- **Classi Bootstrap**: Usa classi `form-check` e `form-check-input`

#### Tipo Toggle
- **Aspetto Visivo**: Toggle stile interruttore con indicatore scorrevole
- **Interazione Utente**: Clicca per scorrere toggle, tastiera spazio/invio per attivare
- **Valore Form**: Booleano (true/false)
- **Classi Bootstrap**: Usa `form-switch` e stili switch correlati

### Comportamento Posizionamento Etichetta

#### Posizione Sopra (Default)
- **Layout**: Flexbox colonna con etichetta sopra input
- **Migliore Per**: Layout più comune, funziona bene per checkbox e toggle
- **Responsivo**: Si impila bene su dispositivi mobili

#### Posizione Sotto
- **Layout**: Flexbox colonna-reverse con etichetta sotto input
- **Migliore Per**: Layout speciali dove contesto aggiuntivo segue la scelta
- **Utilizzo**: Meno comune ma utile per requisiti design specifici

#### Posizione Sinistra
- **Layout**: Flexbox riga con etichetta a sinistra dell'input
- **Migliore Per**: Toggle in pannelli impostazioni, form inline
- **Comportamento**: Etichetta e input sono allineati orizzontalmente

#### Posizione Destra
- **Layout**: Flexbox riga-reverse con etichetta a destra dell'input
- **Migliore Per**: Interfacce stile lista, liste toggle
- **Comportamento**: Input appare prima, poi etichetta

### Pattern Integrazione Form

#### Reactive Forms
```typescript
// Form checkbox base
checkboxForm = this.fb.group({
  newsletter: [false],
  terms: [false, Validators.requiredTrue],
  marketing: [true] // Default selezionato
});

// Interruttori toggle per impostazioni
settingsForm = this.fb.group({
  darkMode: [false],
  notifications: [true],
  autoSave: [false]
});

// Preferenze raggruppate
preferencesForm = this.fb.group({
  communications: this.fb.group({
    email: [true],
    sms: [false],
    push: [true]
  }),
  privacy: this.fb.group({
    shareData: [false],
    analytics: [true],
    cookies: [true]
  })
});
```

#### Template-driven Forms
```html
<!-- Checkbox base con ngModel -->
<quang-checkbox
  [(ngModel)]="isSubscribed"
  checkType="checkbox"
  name="subscription"
  componentLabel="Iscriviti alla newsletter"
>
</quang-checkbox>

<!-- Toggle con validazione -->
<quang-checkbox
  [(ngModel)]="agreedToTerms"
  checkType="checkbox"
  name="terms"
  #termsRef="ngModel"
  required
  componentLabel="Accetto i termini e condizioni"
>
</quang-checkbox>
<div *ngIf="termsRef.invalid && termsRef.touched" class="text-danger">
  Devi accettare i termini per continuare
</div>
```

### Integrazione Validazione

#### Validatori Integrati
```typescript
// Checkbox obbligatoria (deve essere selezionata)
form = this.fb.group({
  consent: [false, Validators.requiredTrue]
});

// Validazione personalizzata
form = this.fb.group({
  agreement: [false, this.customCheckboxValidator]
});

customCheckboxValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value !== true) {
    return { required: { message: 'Questo campo deve essere selezionato' } };
  }
  return null;
}
```

#### Validazione Condizionale
```typescript
// Validazione basata su altri valori form
form = this.fb.group({
  enableFeature: [false],
  featureConfig: ['', []]
});

ngOnInit() {
  // Aggiungi validazione a featureConfig quando enableFeature è selezionato
  this.form.get('enableFeature')?.valueChanges.subscribe(enabled => {
    const configControl = this.form.get('featureConfig');
    if (enabled) {
      configControl?.setValidators([Validators.required]);
    } else {
      configControl?.clearValidators();
    }
    configControl?.updateValueAndValidity();
  });
}
```

### Implementazione Accessibilità

#### Navigazione Tastiera
- **Tab**: Naviga verso/da checkbox
- **Spazio**: Commuta stato checkbox
- **Invio**: Commuta stato checkbox (alternativa a spazio)
- **Esc**: Nessun comportamento default (focus rimane su checkbox)

#### Supporto Screen Reader
- **Attributi Ruolo**: Ruoli `checkbox` o `switch` appropriati
- **Associazione Etichetta**: Collegamento attributi `htmlFor` e `id`
- **Annunci Stato**: Stato selezionato/deselezionato annunciato
- **Messaggi Validazione**: Testo errore e aiuto associato appropriatamente

#### Gestione Focus
- **Indicatori Focus**: Stile focus visivo chiaro
- **Ordine Focus**: Progressione tab logica
- **Persistenza Focus**: Focus mantenuto durante cambi stato

### Considerazioni Prestazioni

#### Change Detection
- **Strategia OnPush**: Change detection ottimizzata per migliori prestazioni
- **Basato su Signal**: Usa signal Angular per gestione stato reattiva
- **Gestione Eventi**: Delega ed gestione eventi efficiente

#### Prestazioni Form
```typescript
// Cambi checkbox con debounce per operazioni costose
form = this.fb.group({
  expensiveToggle: [false]
});

ngOnInit() {
  this.form.get('expensiveToggle')?.valueChanges
    .pipe(
      debounceTime(300),
      takeUntilDestroyed()
    )
    .subscribe(value => {
      if (value) {
        this.performExpensiveOperation();
      }
    });
}
```

## Configurazione Avanzata

### Stili Personalizzati
```scss
// Stili checkbox personalizzati
.custom-checkbox {
  .form-check-input {
    border-radius: 8px;
    border: 2px solid #007bff;
    
    &:checked {
      background-color: #007bff;
      border-color: #007bff;
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }
  
  .form-label {
    font-weight: 600;
    color: #495057;
  }
}

// Stili toggle personalizzati
.custom-toggle {
  .form-switch .form-check-input {
    width: 3rem;
    height: 1.5rem;
    background-color: #6c757d;
    
    &:checked {
      background-color: #28a745;
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.25);
    }
  }
}
```

### Aggiornamenti Etichetta Dinamici
```typescript
// Etichetta dinamica basata su stato
dynamicLabel = computed(() => {
  const isEnabled = this.form.get('feature')?.value;
  return isEnabled ? 'feature.enabled' : 'feature.disabled';
});
```

```html
<quang-checkbox
  checkType="toggle"
  [componentLabel]="dynamicLabel()"
  labelPosition="left"
  formControlName="feature"
>
</quang-checkbox>
```

### Rendering Condizionale
```html
<!-- Mostra checkbox diverse basate su ruolo utente -->
<quang-checkbox
  *ngIf="userRole === 'admin'"
  checkType="toggle"
  componentLabel="admin.settings.advancedMode"
  formControlName="advancedMode"
>
</quang-checkbox>

<quang-checkbox
  *ngIf="userRole === 'user'"
  checkType="checkbox"
  componentLabel="user.settings.simpleOption"
  formControlName="simpleOption"
>
</quang-checkbox>
```

### Integrazione con Gestione Stato
```typescript
// Integrazione Redux/NgRx
onToggleChange(checked: boolean): void {
  this.store.dispatch(updateUserPreference({
    key: 'notifications',
    value: checked
  }));
}

// Pattern Observable
preferences$ = this.preferencesService.getPreferences();

ngOnInit() {
  this.preferences$.subscribe(prefs => {
    this.form.patchValue({
      notifications: prefs.notifications,
      darkMode: prefs.darkMode
    });
  });
}
```

## Best Practice

### Linee Guida UX
- **Etichette Chiare**: Usa etichette descrittive che spiegano chiaramente cosa controlla la checkbox
- **Posizionamento Coerente**: Mantieni posizionamento etichetta coerente in tutta l'applicazione
- **Tipi Appropriati**: Usa checkbox per opzioni binarie, toggle per impostazioni/funzionalità
- **Raggruppamento Logico**: Raggruppa checkbox correlate usando fieldset e legend

### Design Form
- **Indicatori Obbligatori**: Usa asterischi o altri indicatori chiari per checkbox obbligatorie
- **Testo Aiuto**: Fornisci testo esplicativo per opzioni complesse o importanti
- **Timing Validazione**: Valida su blur o submit piuttosto che ad ogni cambiamento
- **Stati Default**: Imposta valori default appropriati basati su aspettative utente

### Best Practice Accessibilità
- **Associazione Etichetta**: Fornisci sempre etichette significative
- **Messaggi Errore**: Usa messaggi errore chiari e specifici
- **Gestione Focus**: Assicura ordine tab logico e indicatori focus chiari
- **Test**: Testa con tecnologie assistive reali

### Linee Guida Prestazioni
- **Minimizza Observer**: Evita sottoscrizioni valori form non necessarie
- **Debounce Operazioni Costose**: Usa debouncing per operazioni attivate da cambi checkbox
- **Strategia OnPush**: Sfrutta change detection OnPush per migliori prestazioni
- **Gestione Memoria**: Pulisci appropriatamente sottoscrizioni ed event listener

## Risoluzione Problemi

### Problemi Comuni

#### Checkbox non risponde ai clic
- **Controlla Controllo Form**: Assicurati che formControlName sia correttamente associato
- **Verifica Stato Disabilitato**: Controlla se checkbox è accidentalmente disabilitata
- **Gestione Eventi**: Verifica che gestori eventi siano implementati correttamente
- **Interferenza CSS**: Controlla CSS che potrebbe bloccare eventi pointer

#### Problemi posizionamento etichetta
- **Dipendenze Bootstrap**: Assicurati che CSS Bootstrap sia caricato correttamente
- **Conflitti CSS**: Controlla regole CSS in conflitto
- **Contenitore Layout**: Verifica che contenitore padre permetta comportamento flexbox appropriato
- **Comportamento Responsivo**: Testa posizionamento etichetta su diverse dimensioni schermo

#### Validazione non funzionante
- **Setup Form**: Verifica che reactive form sia configurato correttamente
- **Configurazione Validatore**: Controlla che validatori siano applicati correttamente
- **Mappa Errori**: Assicurati che errorMap sia strutturata e passata correttamente
- **Timing Validazione**: Verifica trigger validazione (touched, dirty, ecc.)

#### Problemi stile interruttore toggle
- **Versione Bootstrap**: Assicurati versione Bootstrap compatibile per form-switch
- **Import CSS**: Verifica che tutti componenti Bootstrap necessari siano importati
- **Stili Personalizzati**: Controlla stili personalizzati in conflitto
- **Compatibilità Browser**: Testa aspetto toggle su diversi browser

### Problemi Integrazione Form

#### Valore non aggiornato nel form
- **Binding Bidirezionale**: Controlla binding ngModel o formControl
- **Tipo Valore**: Assicurati che form si aspetti valori booleani
- **Valori Iniziali**: Verifica che valori iniziali form siano impostati correttamente
- **Change Detection**: Controlla se componente rileva cambiamenti correttamente

#### Stato validazione non visualizzato
- **Struttura Mappa Errori**: Verifica che mappa errori contenga nomi campo corretti
- **Messaggi Validazione**: Controlla che messaggi validazione siano tradotti correttamente
- **Classi CSS**: Assicurati che classi validazione Bootstrap siano applicate correttamente
- **Problemi Timing**: Verifica che validazione venga eseguita ai tempi appropriati

### Problemi Stili e Layout

#### Problemi layout responsivo
- **Supporto Flexbox**: Assicurati supporto flexbox appropriato nei browser target
- **Test Mobile**: Testa posizionamento etichetta su dispositivi mobili
- **Larghezza Contenitore**: Controlla vincoli larghezza contenitore padre
- **Media Query**: Implementa aggiustamenti responsivi se necessario

#### Stili personalizzati non applicati
- **Specificità CSS**: Assicurati che stili personalizzati abbiano specificità sufficiente
- **Incapsulamento Componente**: Controlla impostazioni ViewEncapsulation
- **Applicazione Classe**: Verifica che input componentClass funzioni
- **Ordine Caricamento Stile**: Controlla ordine caricamento CSS ed ereditarietà

### Problemi Accessibilità

#### Problemi screen reader
- **Associazione Etichetta**: Verifica che etichetta e input siano associati correttamente
- **Attributi Ruolo**: Controlla che ruoli appropriati siano impostati
- **Annunci Stato**: Testa con screen reader reali
- **Gestione Focus**: Assicurati che focus sia gestito correttamente

#### Problemi navigazione tastiera
- **Ordine Tab**: Verifica progressione tab logica
- **Gestori Tasti**: Controlla che tasti spazio e invio funzionino
- **Indicatori Focus**: Assicurati stile focus visibile
- **Propagazione Eventi**: Controlla conflitti gestione eventi

## Note

Questo componente estende `QuangBaseComponent` ed eredita tutte le sue funzionalità, inclusa gestione etichette, visualizzazione validazione, gestione errori e messaggi successo. Si integra perfettamente con i sistemi form di Angular e fornisce opzioni personalizzazione estese per vari casi d'uso.

### Integrazione Bootstrap
Il componente sfrutta le classi form Bootstrap per stile coerente:
- **Checkbox**: Usa `form-check`, `form-check-input` e `form-check-label`
- **Toggle**: Usa `form-switch` e classi stile switch correlate
- **Validazione**: Usa classi `is-valid` e `is-invalid` per feedback visivo

### Integrazione QuangTranslationService
- **Traduzione Automatica**: Tutte etichette, testo aiuto e messaggi errore tradotti automaticamente
- **Supporto Chiavi**: Usa chiavi traduzione per tutto contenuto testuale
- **Gestione Fallback**: Fornisce fallback elegante quando traduzioni non disponibili
- **Lingua Dinamica**: Risponde a cambi lingua senza ricaricamento componente

### Tipi Valore Controllo Form
Il componente si aspetta e restituisce valori booleani:
- **Selezionato**: `true`
- **Deselezionato**: `false`
- **Stato Iniziale**: Può essere impostato tramite valore iniziale controllo form o ngModel
