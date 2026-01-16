# Componente QuangAutocomplete

Il `QuangAutocompleteComponent` è un input autocomplete completo con suggerimenti in tempo reale, capacità di selezione multipla e gestione dei chip. Fornisce filtri intelligenti, navigazione da tastiera e integrazione perfetta con i form Angular supportando sia modalità di selezione singola che multipla.

## Input

- `selectOptions`: `SelectOption[]` — Array di opzioni disponibili per la selezione. Ogni opzione dovrebbe avere proprietà `value` e `label`. **(Obbligatorio)**
- `allowFreeText`: `boolean` — Quando true, permette qualsiasi testo in input come valore form valido, non solo valori delle opzioni. Il valore del form si sincronizzerà con qualsiasi testo digitato dall'utente. Quando false, il valore del form deve corrispondere a uno dei valori delle opzioni. Default: `false`
- `autoSelectOnExactMatch`: `boolean` — Quando true e `allowFreeText` è false, seleziona automaticamente un'opzione se il testo digitato dall'utente corrisponde esattamente all'etichetta di un'opzione (case-insensitive, trimmed). Migliora l'esperienza utente selezionando automaticamente quando l'utente digita un'etichetta completa. Default: `true`
- `updateValueOnType`: `boolean` — Quando true, aggiorna il valore del form mentre l'utente digita (dopo debounce). Quando false, il valore del form viene aggiornato solo quando l'utente seleziona un'opzione dal dropdown o quando l'input perde il focus (blur). Default: `false`
- `multiple`: `boolean` — Abilita modalità selezione multipla con visualizzazione chip. Default: `false`
- `multiSelectDisplayMode`: `'vertical' | 'horizontal'` — Direzione layout per i chip in modalità multipla. La modalità orizzontale include supporto scroll. Default: `'vertical'`
- `chipMaxLength`: `number` — Lunghezza massima caratteri per le etichette dei chip. Etichette più lunghe verranno troncate con puntini di sospensione. Default: `0` (nessun limite)
- `optionListMaxHeight`: `string` — Altezza massima per la lista opzioni dropdown con unità CSS. Default: `'200px'`
- `translateValue`: `boolean` — Abilita traduzione dei valori delle opzioni tramite QuangTranslationService. Default: `true`
- `scrollBehaviorOnOpen`: `ScrollBehavior` — Comportamento scroll all'apertura dropdown ('smooth' o 'instant'). Default: `'smooth'`
- `emitOnly`: `boolean` — Emette solo eventi di selezione senza aggiornare il controllo form. Utile per visualizzazione suggerimenti di sola lettura. Default: `false`
- `searchTextDebounce`: `number` — Ritardo debounce in millisecondi per input ricerca per ottimizzare le prestazioni. Default: `300`
- `internalFilterOptions`: `boolean` — Usa logica filtro integrata. Disabilita per filtro esterno personalizzato tramite evento searchTextChange. Default: `true`
- `syncFormWithText`: `boolean` — **@deprecated** Usare `allowFreeText` invece. Sincronizza il valore del controllo form con il testo input mentre l'utente digita. Default: `false`
- `isReadonly`: `boolean` — Imposta componente in modalità sola lettura. Ereditato da `QuangBaseComponent`
- `componentLabel`: `string` — Testo etichetta per il componente. Ereditato da `QuangBaseComponent`
- `componentPlaceholder`: `string` — Testo placeholder per l'input. Ereditato da `QuangBaseComponent`
- `componentTabIndex`: `number` — Indice tab per accessibilità. Ereditato da `QuangBaseComponent`
- `componentClass`: `string | string[]` — Classi CSS aggiuntive. Ereditato da `QuangBaseComponent`
- `errorMap`: `{[key: string]: string}` — Messaggi errore personalizzati. Ereditato da `QuangBaseComponent`
- `successMessage`: `string` — Messaggio successo da visualizzare. Ereditato da `QuangBaseComponent`
- `helpMessage`: `string` — Testo aiuto per il componente. Ereditato da `QuangBaseComponent`
- `formControl`: `FormControl` — Controllo form per form reattivi. Ereditato da `QuangBaseComponent`

## Output

- `selectedOption`: `EventEmitter<string | number | null>` — Emesso quando un'opzione viene selezionata in modalità singola. Fornisce il valore dell'opzione selezionata
- `searchTextChange`: `EventEmitter<string>` — Emesso quando il testo di ricerca cambia dopo il periodo di debounce. Usare per filtri esterni o chiamate API
- `componentBlur`: `EventEmitter<void>` — Emesso quando il componente perde il focus. Ereditato da `QuangBaseComponent`

## Utilizzo

### Selezione Singola Base

```html
<quang-autocomplete
  [selectOptions]="countryOptions"
  formControlName="country"
>
</quang-autocomplete>
```

### Selezione Multipla con Chip

```html
<quang-autocomplete
  [selectOptions]="skillOptions"
  [multiple]="true"
  formControlName="skills"
>
</quang-autocomplete>
```

### Opzioni con template

Ogni `SelectOption` può fornire un `renderer` (simile a `quang-table` e `quang-radio-group`), che viene utilizzato al posto dell’etichetta standard nella lista dei suggerimenti.

```html
<ng-template
  #customOption
  let-opt
  let-selected="selected"
>
  <span class="d-flex gap-2 align-items-center">
    <strong>{{ opt.label }}</strong>
    <small class="text-muted">selezionato: {{ selected }}</small>
  </span>
</ng-template>

<quang-autocomplete
  [selectOptions]="templatedOptions"
  formControlName="country"
/>
```

```ts
import { TemplateRef, viewChild } from '@angular/core'
import { SelectOption, QuangSelectOptionTemplateContext } from 'quang/components/shared'

customOptionTemplate = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('customOption')

templatedOptions: SelectOption[] = [
  { value: 'us', label: 'Stati Uniti' },
  { value: 'ca', label: 'Canada', renderer: this.customOptionTemplate() },
]
```

#### Esempio TypeScript

```typescript
export class MyComponent {
  countryOptions: SelectOption[] = [
    { value: 'it', label: 'Italia' },
    { value: 'us', label: 'Stati Uniti' },
    { value: 'de', label: 'Germania' }
  ]

  skillOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' }
  ]

  onOptionSelected(value: string | number | null): void {
    console.log('Selezionato:', value)
  }

  onSearchChange(searchTerm: string): void {
    // Gestisce filtro esterno
  }
}
```

### Integrazione Traduzione

Il componente usa QuangTranslationService per tutto il contenuto testuale:

- **Traduzione Automatica**: Etichette opzioni e messaggi componente tradotti automaticamente
- **Supporto Chiavi**: Usa chiavi traduzione come etichette per localizzazione automatica
- **Gestione Fallback**: Fornisce visualizzazione fallback quando traduzioni non disponibili
- **Cambio Lingua Dinamico**: Risponde a cambi lingua senza ricaricamento componente
