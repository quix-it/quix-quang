# Componente QuangAutocomplete

Il `QuangAutocompleteComponent` è un input autocomplete completo con suggerimenti in tempo reale, capacità di selezione multipla e gestione dei chip. Fornisce filtri intelligenti, navigazione da tastiera e integrazione perfetta con i form Angular supportando sia modalità di selezione singola che multipla.

## Funzionalità Supportate

### Modalità di Selezione
- **Selezione Singola**: Autocomplete tradizionale con selezione di un singolo valore
- **Selezione Multipla**: Selezione multipla basata su chip con feedback visivo
- **Gestione Chip**: Aggiungere, rimuovere e navigare tra i chip con tastiera e mouse
- **Gestione Valori Vuoti**: Comportamento configurabile per selezioni vuote

### Filtro Input
- **Filtro in Tempo Reale**: Ricerca live con debouncing configurabile
- **Filtro Interno**: Filtro integrato basato su testo con corrispondenza non sensibile a maiuscole/minuscole
- **Filtro Esterno**: Supporto per filtri personalizzati tramite eventi di ricerca
- **Sincronizzazione Opzioni**: Mantiene sincronizzati i valori del form con il testo visualizzato

### Personalizzazione Display
- **Layout Chip**: Disposizione orizzontale o verticale dei chip
- **Limiti Lunghezza Chip**: Lunghezza massima configurabile per le etichette dei chip
- **Dimensionamento Dropdown**: Altezza e posizionamento dropdown personalizzabili
- **Comportamento Scroll**: Scorrimento fluido o istantaneo per l'apertura del dropdown

### Accessibilità e Navigazione
- **Navigazione da Tastiera**: Supporto completo tastiera per chip e opzioni
- **Gestione Focus**: Gestione intelligente del focus tra input e chip
- **Supporto Screen Reader**: Etichette ARIA e annunci
- **Navigazione Backspace**: Navigazione e cancellazione chip con tasto backspace

### Internazionalizzazione
- **Supporto Traduzione**: Integrato con QuangTranslationService
- **Traduzione Valori**: Traduzione opzionale dei valori delle opzioni
- **Localizzazione Etichette**: Supporto completo per etichette e messaggi localizzati

## Input

- `selectOptions`: `SelectOption[]` — Array di opzioni disponibili per la selezione. Ogni opzione dovrebbe avere proprietà `value` e `label`. **(Obbligatorio)**
- `multiple`: `boolean` — Abilita modalità selezione multipla con visualizzazione chip. Default: `false`
- `multiSelectDisplayMode`: `'vertical' | 'horizontal'` — Direzione layout per i chip in modalità multipla. La modalità orizzontale include supporto scroll. Default: `'vertical'`
- `chipMaxLength`: `number` — Lunghezza massima caratteri per le etichette dei chip. Etichette più lunghe verranno troncate con puntini di sospensione. Default: `0` (nessun limite)
- `syncFormWithText`: `boolean` — Sincronizza il valore del controllo form con il testo input mentre l'utente digita. Utile per input testo libero con suggerimenti. Default: `false`
- `optionListMaxHeight`: `string` — Altezza massima per la lista opzioni dropdown con unità CSS. Default: `'200px'`
- `translateValue`: `boolean` — Abilita traduzione dei valori delle opzioni tramite QuangTranslationService. Default: `true`
- `scrollBehaviorOnOpen`: `ScrollBehavior` — Comportamento scroll all'apertura dropdown ('smooth' o 'instant'). Default: `'smooth'`
- `emitOnly`: `boolean` — Emette solo eventi di selezione senza aggiornare il controllo form. Utile per visualizzazione suggerimenti di sola lettura. Default: `false`
- `searchTextDebounce`: `number` — Ritardo debounce in millisecondi per input ricerca per ottimizzare le prestazioni. Default: `300`
- `internalFilterOptions`: `boolean` — Usa logica filtro integrata. Disabilita per filtro esterno personalizzato tramite evento searchTextChange. Default: `true`
Tutti gli input standard ereditati da `QuangBaseComponent`: `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- `selectedOption`: `EventEmitter<string | number | null>` — Emesso quando un'opzione viene selezionata in modalità singola. Fornisce il valore dell'opzione selezionata
- `searchTextChange`: `EventEmitter<string>` — Emesso quando il testo di ricerca cambia dopo il periodo di debounce. Usare per filtri esterni o chiamate API
Tutti gli output standard ereditati da `QuangBaseComponent`: `componentBlur`

## Utilizzo

### Selezione Singola Base
```html
<quang-autocomplete
  [selectOptions]="countryOptions"
  [errorMap]="errors()"
  componentLabel="form.label.country"
  componentPlaceholder="Inizia a digitare il nome del paese..."
  formControlName="country"
>
</quang-autocomplete>
```

### Selezione Multipla con Chip
```html
<quang-autocomplete
  [selectOptions]="skillOptions"
  [multiple]="true"
  [multiSelectDisplayMode]="'horizontal'"
  [chipMaxLength]="20"
  [errorMap]="errors()"
  componentLabel="form.label.skills"
  componentPlaceholder="Aggiungi competenze..."
  formControlName="skills"
  successMessage="Competenze selezionate con successo"
>
</quang-autocomplete>
```

### Integrazione API Esterna
```html
<quang-autocomplete
  [selectOptions]="filteredUsers"
  [internalFilterOptions]="false"
  [searchTextDebounce]="500"
  [errorMap]="errors()"
  (searchTextChange)="searchUsers($event)"
  (selectedOption)="onUserSelected($event)"
  componentLabel="form.label.assignee"
  componentPlaceholder="Cerca utenti..."
  formControlName="assignedUser"
>
</quang-autocomplete>
```

#### TypeScript per API Esterna
```typescript
filteredUsers: SelectOption[] = [];
private userService = inject(UserService);

searchUsers(searchTerm: string): void {
  if (searchTerm.length >= 2) {
    this.userService.searchUsers(searchTerm).subscribe(users => {
      this.filteredUsers = users.map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName} (${user.email})`
      }));
    });
  } else {
    this.filteredUsers = [];
  }
}

onUserSelected(userId: string | number | null): void {
  if (userId) {
    console.log('ID utente selezionato:', userId);
  }
}
```

### Modalità Readonly con Chip Preimpostati
```html
<quang-autocomplete
  [selectOptions]="tagOptions"
  [multiple]="true"
  [isReadonly]="true"
  [multiSelectDisplayMode]="'horizontal'"
  [chipMaxLength]="15"
  componentLabel="form.label.appliedTags"
  formControlName="tags"
>
</quang-autocomplete>
```

### Input Testo Libero con Suggerimenti
```html
<quang-autocomplete
  [selectOptions]="suggestionOptions"
  [syncFormWithText]="true"
  [errorMap]="errors()"
  componentLabel="form.label.freeTextWithSuggestions"
  componentPlaceholder="Digita qualsiasi cosa o seleziona suggerimento..."
  formControlName="freeText"
>
</quang-autocomplete>
```

### Modalità Solo Emissione per Visualizzazione
```html
<quang-autocomplete
  [selectOptions]="displayOptions"
  [emitOnly]="true"
  (selectedOption)="showPreview($event)"
  componentLabel="Selezione Anteprima"
  componentPlaceholder="Seleziona elemento per anteprima..."
>
</quang-autocomplete>
```

#### TypeScript per Solo Emissione
```typescript
showPreview(optionValue: string | number | null): void {
  if (optionValue) {
    // Mostra anteprima senza influenzare stato form
    this.previewContent = this.getPreviewContent(optionValue);
  }
}
```

### Stile Dropdown Personalizzato
```html
<quang-autocomplete
  [selectOptions]="styledOptions"
  [optionListMaxHeight]="'300px'"
  [scrollBehaviorOnOpen]="'instant'"
  [errorMap]="errors()"
  componentLabel="form.label.customDropdown"
  componentClass="custom-autocomplete"
  formControlName="styledSelection"
>
</quang-autocomplete>
```

### Autocomplete Localizzato
```html
<quang-autocomplete
  [selectOptions]="localizedOptions"
  [translateValue]="true"
  [errorMap]="errors()"
  componentLabel="form.label.language"
  formControlName="selectedLanguage"
>
</quang-autocomplete>
```

#### TypeScript per Localizzazione
```typescript
localizedOptions: SelectOption[] = [
  { value: 'en', label: 'languages.english' },
  { value: 'it', label: 'languages.italian' },
  { value: 'fr', label: 'languages.french' },
  { value: 'de', label: 'languages.german' }
];
```

## Comportamento Componente

### Modalità di Selezione

#### Modalità Selezione Singola (Default)
- **Valore Form**: `string | number | null`
- **Interazione Utente**: Digita per filtrare, clicca o premi Invio per selezionare
- **Visualizzazione**: L'etichetta dell'opzione selezionata appare nel campo input
- **Cancellazione**: Backspace o Canc per cancellare la selezione

#### Modalità Selezione Multipla
- **Valore Form**: `string[] | number[]`
- **Interazione Utente**: Digita per filtrare, seleziona opzioni multiple come chip
- **Visualizzazione**: Opzioni selezionate mostrate come chip rimovibili sopra/accanto all'input
- **Gestione**: Clicca X sul chip o usa navigazione tastiera per rimuovere

### Navigazione da Tastiera

#### Navigazione Campo Input
- **Tab**: Sposta focus verso/da input autocomplete
- **Freccia Giù/Su**: Naviga tra opzioni dropdown
- **Invio**: Seleziona opzione focalizzata
- **Esc**: Chiude dropdown senza selezione

#### Navigazione Chip (Modalità Multipla)
- **Backspace (input vuoto)**: Focalizza ultimo chip
- **Backspace (su chip)**: Elimina chip focalizzato
- **Freccia Sinistra/Destra**: Naviga tra chip
- **Canc (su chip)**: Rimuove chip focalizzato
- **Tab**: Sposta focus al prossimo elemento form

#### Opzioni Dropdown
- **Frecce**: Naviga lista opzioni
- **Invio/Spazio**: Seleziona opzione evidenziata
- **Esc**: Chiude dropdown
- **Home/Fine**: Salta alla prima/ultima opzione

### Comportamento Filtro

#### Filtro Interno (`internalFilterOptions: true`)
- **Corrispondenza non sensibile a maiuscole/minuscole**: Trova testo ovunque nelle etichette opzioni
- **Aggiornamenti in tempo reale**: Il filtro si aggiorna mentre l'utente digita
- **Ricerca con debounce**: Usa `searchTextDebounce` per ottimizzare le prestazioni
- **Auto-mostra dropdown**: Si apre automaticamente quando viene inserito testo

#### Filtro Esterno (`internalFilterOptions: false`)
- **Guidato da eventi**: Emette `searchTextChange` per filtro personalizzato
- **Integrazione API**: Perfetto per ricerca lato server
- **Controllo manuale**: Il componente mostra le opzioni fornite senza filtro
- **Stati di caricamento**: Gestisce indicatori di caricamento esternamente

### Integrazione Form

#### Integrazione Reactive Forms
```typescript
// Selezione singola
userForm = this.fb.group({
  country: ['', Validators.required]
});

// Selezione multipla
preferencesForm = this.fb.group({
  interests: [[] as string[], Validators.minLength(1)]
});

// Validazione personalizzata
advancedForm = this.fb.group({
  skills: [[], this.validateSkills]
});

validateSkills(control: AbstractControl): ValidationErrors | null {
  const skills = control.value as string[];
  if (skills && skills.length > 5) {
    return { tooManySkills: { max: 5, actual: skills.length } };
  }
  return null;
}
```

#### Form Template-driven
```html
<!-- Selezione singola -->
<quang-autocomplete
  [(ngModel)]="selectedCountry"
  [selectOptions]="countries"
  name="country"
  #countryRef="ngModel"
  required
>
</quang-autocomplete>

<!-- Selezione multipla -->
<quang-autocomplete
  [(ngModel)]="selectedSkills"
  [selectOptions]="skills"
  [multiple]="true"
  name="skills"
  #skillsRef="ngModel"
>
</quang-autocomplete>
```

### Gestione Chip

#### Opzioni Visualizzazione Chip
- **Layout Verticale**: Chip impilati verticalmente (default)
- **Layout Orizzontale**: Chip in singola riga con scroll orizzontale
- **Limitazione Lunghezza**: Tronca etichette chip lunghe con puntini di sospensione
- **Interfaccia Rimozione**: Clicca pulsante X o navigazione tastiera

#### Pattern Interazione Chip
```typescript
// Gestione chip programmatica
addChip(value: string | number): void {
  const currentValues = this.form.get('chips')?.value || [];
  if (!currentValues.includes(value)) {
    this.form.get('chips')?.setValue([...currentValues, value]);
  }
}

removeChip(value: string | number): void {
  const currentValues = this.form.get('chips')?.value || [];
  const filteredValues = currentValues.filter((v: any) => v !== value);
  this.form.get('chips')?.setValue(filteredValues);
}

clearAllChips(): void {
  this.form.get('chips')?.setValue([]);
}
```

### Ottimizzazione Prestazioni

#### Configurazione Debouncing
- **Debounce Default**: 300ms bilancia reattività e prestazioni
- **Integrazione API**: Aumenta a 500-1000ms per ricerche esterne
- **Filtro Locale**: Riduci a 100-200ms per feedback immediato
- **Elaborazione Pesante**: Aumenta per operazioni di filtro complesse

#### Gestione Dataset Grandi
```typescript
// Scroll virtuale per liste opzioni grandi
largeDatasetOptions: SelectOption[] = [];

// Implementazione caricamento lazy
loadOptions(searchTerm: string, page: number = 0): void {
  this.dataService.getOptions(searchTerm, page, 50).subscribe(options => {
    if (page === 0) {
      this.largeDatasetOptions = options;
    } else {
      this.largeDatasetOptions.push(...options);
    }
  });
}

// Ottimizzazione memoria per cambi opzioni
ngOnDestroy(): void {
  this.largeDatasetOptions = [];
}
```

## Funzionalità Accessibilità

### Supporto Tastiera
- **Navigazione Completa Tastiera**: Interazione completa senza mouse
- **Gestione Focus**: Progressione focus logica attraverso componenti
- **Sequenze Escape**: Comportamento coerente tasto escape
- **Scorciatoie Selezione**: Invio e Spazio per selezioni

### Supporto Screen Reader
- **Etichette ARIA**: Etichettatura appropriata per tutti elementi interattivi
- **Regioni Live**: Annunci per cambi selezione
- **Attributi Ruolo**: Ruoli semantici corretti per funzionalità autocomplete
- **Annunci Stato**: Conteggio selezioni e opzioni disponibili annunciati

### Gestione Focus
- **Intrappolamento Focus**: Focus contenuto nel dropdown attivo
- **Ritorno Focus**: Ritorna all'input dopo operazioni chip
- **Indicatori Visivi**: Stile focus chiaro per tutti elementi interattivi
- **Ordine Focus**: Progressione tab logica

## Configurazione Avanzata

### Template Opzioni Personalizzate
```typescript
// Definisci interfaccia opzione personalizzata
interface CustomSelectOption extends SelectOption {
  avatar?: string;
  category?: string;
  description?: string;
}

// Usa nel componente
customOptions: CustomSelectOption[] = [
  {
    value: 'john.doe',
    label: 'John Doe',
    avatar: '/avatars/john.jpg',
    category: 'Sviluppatore',
    description: 'Sviluppatore Frontend Senior'
  }
];
```

### Caricamento Opzioni Dinamico
```typescript
// Servizio per opzioni dinamiche
@Injectable()
export class AutocompleteDataService {
  private cache = new Map<string, SelectOption[]>();

  searchOptions(query: string, category?: string): Observable<SelectOption[]> {
    const cacheKey = `${query}-${category}`;
    
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey)!);
    }

    return this.http.get<any[]>(`/api/search`, {
      params: { q: query, category: category || '' }
    }).pipe(
      map(items => items.map(item => ({
        value: item.id,
        label: item.name
      }))),
      tap(options => this.cache.set(cacheKey, options))
    );
  }
}

// Utilizzo componente
onSearchChange(searchTerm: string): void {
  this.dataService.searchOptions(searchTerm, this.selectedCategory)
    .subscribe(options => {
      this.selectOptions = options;
    });
}
```

### Validazione Personalizzata
```typescript
// Validatore multi-selezione
export function chipCountValidator(min: number, max: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!Array.isArray(value)) return null;
    
    if (value.length < min) {
      return { minChips: { required: min, actual: value.length } };
    }
    
    if (value.length > max) {
      return { maxChips: { required: max, actual: value.length } };
    }
    
    return null;
  };
}

// Utilizzo nel form
form = this.fb.group({
  tags: [[], [chipCountValidator(1, 5)]]
});
```

### Personalizzazione Stili
```scss
// Stile autocomplete personalizzato
.custom-autocomplete {
  .autocomplete-input {
    border: 2px solid #007bff;
    border-radius: 8px;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }
  
  .chip-container {
    &.horizontal {
      max-width: 100%;
      overflow-x: auto;
      scrollbar-width: thin;
      
      &::-webkit-scrollbar {
        height: 6px;
      }
    }
  }
  
  .chip {
    background: linear-gradient(45deg, #007bff, #0056b3);
    color: white;
    border-radius: 16px;
    
    .chip-close {
      color: rgba(255, 255, 255, 0.8);
      
      &:hover {
        color: white;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
  
  .option-list {
    border: 1px solid #007bff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    .option-item {
      &:hover, &.focused {
        background: rgba(0, 123, 255, 0.1);
      }
      
      &.selected {
        background: #007bff;
        color: white;
      }
    }
  }
}
```

## Best Practice

### Gestione Opzioni
- **Tipi Valore Coerenti**: Usa stringhe o numeri in modo coerente
- **Valori Unici**: Assicurati che i valori delle opzioni siano unici nel dataset
- **Chiarezza Etichette**: Fornisci etichette descrittive che aiutino gli utenti a identificare le opzioni
- **Raggruppamento Categorie**: Raggruppa opzioni correlate per migliore esperienza utente

### Linee Guida Prestazioni
- **Ottimizzazione Debounce**: Regola timing debounce basato su origine dati
- **Limitazione Opzioni**: Limita opzioni visualizzate per non sopraffare gli utenti
- **Strategia Cache**: Cache set opzioni acceduti frequentemente
- **Scroll Virtuale**: Implementa per dataset oltre 1000 elementi

### Raccomandazioni UX
- **Testo Placeholder**: Fornisci testo placeholder utile che descriva input atteso
- **Lunghezza Ricerca Minima**: Richiedi 2-3 caratteri prima di mostrare suggerimenti
- **Stati Caricamento**: Mostra indicatori caricamento per operazioni asincrone
- **Gestione Errori**: Fornisci messaggi errore chiari per ricerche fallite

### Linee Guida Accessibilità
- **Associazione Etichette**: Fornisci sempre etichette significative
- **Descrizioni Errore**: Collega messaggi errore ai controlli form
- **Test Tastiera**: Testa tutte funzionalità solo con tastiera
- **Test Screen Reader**: Verifica con software screen reader reale

## Risoluzione Problemi

### Problemi Comuni

#### Opzioni non visualizzate
- **Controlla selectOptions**: Assicurati che l'array sia popolato correttamente
- **Verifica filtro**: Controlla impostazione `internalFilterOptions`
- **Debug eventi ricerca**: Monitora emissioni `searchTextChange`
- **Valida formato opzione**: Assicurati che gli oggetti abbiano proprietà `value` e `label`

#### Valore form non aggiornato
- **Binding controllo form**: Verifica che `formControlName` o `formControl` sia corretto
- **Modalità multipla**: Controlla se il form si aspetta array per selezione multipla
- **Impostazioni sync**: Rivedi configurazione `syncFormWithText` e `emitOnly`
- **Stato validazione**: Assicurati che il controllo form non sia disabilitato

#### Problemi funzionalità chip
- **Modalità multipla**: Verifica che input `multiple` sia impostato a `true`
- **Navigazione tastiera**: Controlla gestione focus e gestione eventi
- **Layout display**: Testa layout chip sia verticale che orizzontale
- **Limitazione lunghezza**: Verifica configurazione `chipMaxLength`

#### Problemi prestazioni
- **Debounce alto**: Aumenta `searchTextDebounce` per operazioni lente
- **Dataset grandi**: Implementa paginazione o scroll virtuale
- **Memory leak**: Controlla pulizia sottoscrizioni appropriata
- **Re-render frequenti**: Ottimizza strategia change detection

### Problemi Stili

#### Posizionamento dropdown
- **Overflow contenitore**: Controlla impostazioni CSS overflow contenitore padre
- **Conflitti z-index**: Assicurati che dropdown abbia z-index sufficiente
- **Clipping viewport**: Testa dropdown vicino ai bordi schermo
- **Responsività mobile**: Verifica comportamento su dispositivi mobili

#### Layout contenitore chip
- **Scroll orizzontale**: Verifica comportamento scroll in modalità orizzontale
- **Design responsivo**: Testa wrapping chip e dimensionamento contenitore
- **Indicatori focus**: Assicurati che focus tastiera sia visibile
- **Target touch**: Verifica dimensione target touch adeguata per mobile

### Problemi Integrazione

#### Integrazione API
- **Problemi CORS**: Verifica accesso API da dominio client
- **Formato risposta**: Assicurati che API restituisca struttura dati attesa
- **Gestione errori**: Implementa gestione errori appropriata per richieste fallite
- **Rate limiting**: Gestisci limiti rate API con debouncing appropriato

#### Conflitti framework form
- **Timing validazione**: Controlla timing trigger validazione
- **Validatori personalizzati**: Verifica compatibilità validatori
- **Gestione stato form**: Rivedi cambi stato controllo form
- **Propagazione eventi**: Controlla conflitti gestione eventi

#### Conflitti librerie terze parti
- **Conflitti framework CSS**: Controlla stili in conflitto
- **Conflitti event listener**: Verifica che gestione eventi non interferisca
- **Versioni dipendenze**: Assicurati versioni librerie compatibili
- **Ordine import**: Controlla ordine import moduli in Angular

## Note

Questo componente estende `QuangBaseComponent` ed eredita tutte le sue funzionalità, inclusa gestione etichette, visualizzazione validazione, gestione errori e messaggi successo. Si integra perfettamente con il sistema reactive forms di Angular e fornisce opzioni di personalizzazione estese per vari casi d'uso.

### Interfaccia SelectOption
Il componente si aspetta opzioni nel seguente formato:
```typescript
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: any; // Proprietà personalizzate aggiuntive
}
```

### Integrazione con QuangTranslationService
- **Traduzione Automatica**: Etichette opzioni e messaggi componente tradotti automaticamente
- **Supporto Chiavi**: Usa chiavi traduzione come etichette per localizzazione automatica
- **Gestione Fallback**: Fornisce visualizzazione fallback quando traduzioni non disponibili
- **Cambio Lingua Dinamico**: Risponde a cambi lingua senza ricaricamento componente

```html
<quang-autocomplete
  [multiple]="true"
  [multiSelectDisplayMode]="'horizontal'"
  [chipMaxLength]="12"
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  [searchTextDebounce]="500"
  [selectOptions]="stringListFiltered()"
  (searchTextChange)="changeTextTest($event)"
  (selectedOption)="onSelectOption($event)"
  class="col-6"
  componentLabel="form.label.autocompleteAsync"
  formControlName="testInput1"
  successMessage="form.label.success"
/>
```

## Note

Questo componente estende `QuangBaseComponent` ed eredita tutte le sue funzionalità, come etichette e messaggi di validazione. Si consiglia l'uso con Reactive Forms di Angular per i migliori risultati.

Per un uso avanzato e personalizzazioni, consulta la documentazione completa e gli esempi nella libreria Quang.
