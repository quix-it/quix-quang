# Componente QuangAutocomplete

Il `QuangAutocompleteComponent` fornisce suggerimenti in tempo reale mentre l'utente digita, permettendo una selezione rapida da una lista di opzioni filtrate. È progettato per essere flessibile e personalizzabile per diversi casi d'uso nei form Angular.

## Funzionalità

- Suggerimenti in tempo reale durante la digitazione
- Selezione semplice da opzioni filtrate
- Lista suggerimenti e visualizzazione personalizzabili
- Supporto per Reactive Forms e Template-driven Forms di Angular
- Debounce configurabile per l'input di ricerca
- Supporto readonly e validazione
- **Selezione multipla con chip** (visualizzazione orizzontale/verticale)
- Navigazione da tastiera e cancellazione chip (Backspace)
- Gestione del focus sui chip (Backspace mette a fuoco l'ultimo chip, un secondo Backspace lo elimina)
- Scorrimento orizzontale dei chip con la rotella del mouse in modalità orizzontale

## Input

- `selectOptions`: `SelectOption[]` — Array di opzioni da mostrare come suggerimenti. **(Obbligatorio)**
- `multiple`: `boolean` — Abilita la selezione multipla (chip). Default: `false`.
- `multiSelectDisplayMode`: `'vertical' | 'horizontal'` — Visualizza i chip in verticale o orizzontale. Default: `'vertical'`.
- `chipMaxLength`: `number` — Lunghezza massima (in caratteri) per l'etichetta di un chip. Default: `0` (nessun limite).
- `syncFormWithText`: `boolean` — Se true, il valore del form è sincronizzato con il testo dell'input. Default: `false`.
- `optionListMaxHeight`: `string` — Altezza massima della lista a discesa. Default: `'200px'`.
- `translateValue`: `boolean` — Se tradurre i valori delle opzioni. Default: `true`.
- `scrollBehaviorOnOpen`: `ScrollBehavior` — Comportamento di scroll all'apertura della lista. Default: `'smooth'`.
- `emitOnly`: `boolean` — Se true, emette solo il valore senza salvarlo in ngControl. Default: `false`.
- `searchTextDebounce`: `number` — Debounce in millisecondi per l'input di ricerca. Default: `300`.
- `internalFilterOptions`: `boolean` — Se true, filtra le opzioni internamente. Default: `true`.
- Tutti gli input standard di form/label/validazione ereditati da `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- `selectedOption`: Emette il valore selezionato quando viene scelta una voce.
- `searchTextChange`: Emette il testo di ricerca corrente mentre l'utente digita.
- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`

## Modalità Multipla/Chip

- Quando `multiple` è `true`, le opzioni selezionate vengono mostrate come chip rimovibili.
- I chip possono essere visualizzati orizzontalmente o verticalmente tramite `multiSelectDisplayMode`.
- I chip hanno un pulsante di chiusura per la rimozione. Se l'input è vuoto, premendo Backspace si mette a fuoco l'ultimo chip; premendo ancora Backspace lo si elimina.
- Il focus è gestito per l'accessibilità: dopo la cancellazione di un chip, il focus si sposta sul chip precedente o sull'input.
- Il contenitore dei chip supporta lo scorrimento orizzontale con la rotella del mouse in modalità orizzontale.
- Puoi limitare la lunghezza dell'etichetta dei chip con `chipMaxLength`.

## Esempio d'uso

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
