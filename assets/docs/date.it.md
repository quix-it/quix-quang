# Componente QuangDate

Il `QuangDateComponent` è un selettore di date e orari completo basato su [Air Datepicker](https://air-datepicker.com/docs). Fornisce capacità di personalizzazione complete, supporto per l'internazionalizzazione e varie modalità di visualizzazione inclusi calendari inline e selettori solo per l'orario.

## Funzionalità Supportate

### Modalità di Selezione Date
- **Data Singola**: Seleziona una singola data
- **Intervallo Date**: Seleziona date di inizio e fine con evidenziazione dell'intervallo
- **Calendario Inline**: Visualizza il calendario direttamente nella pagina senza popup
- **Solo Orario**: Mostra solo il selettore orario senza selezione della data

### Formati Input
- **Formati Date Personalizzati**: Formati di visualizzazione configurabili usando pattern Unicode
- **Formati Orario**: Configurazione separata per il formato orario
- **Gestione Date Non Valide**: Messaggi personalizzati per input di date non valide
- **Input di Ricerca**: Ricerca in tempo reale con debouncing per l'input della data

### Internazionalizzazione
- **Supporto Multi-lingua**: Integrato con QuangTranslationService
- **Override Locale**: Capacità di impostazione manuale del locale
- **Fallback Lingua Browser**: Rilevamento automatico della lingua

### Personalizzazione
- **Supporto Icone**: Icone calendario personalizzate tramite content projection
- **Stili CSS**: Classi personalizzate per elementi calendario e pulsante
- **Controllo Posizione**: Posizionamento popup configurabile
- **Integrazione Air Datepicker**: Accesso completo alle opzioni di Air Datepicker

## Input

- `datepickerOptions`: `QuangDatepickerOptions | undefined` — Oggetto di configurazione completo di Air Datepicker per personalizzazione avanzata. **Sovrascrive i default del componente**

- `dateFormat`: `string` — Formato di visualizzazione per le date usando [pattern Unicode](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table). Default: `'dd/MM/yyyy'`
- `timeFormat`: `string` — Formato di visualizzazione per l'orario usando pattern Unicode. Default: `'HH:mm'`
- `invalidDateMessage`: `string` — Messaggio mostrato quando l'utente inserisce un formato data non valido

- `minDate`: `Date | undefined` — Prima data selezionabile
- `maxDate`: `Date | undefined` — Ultima data selezionabile
- `minHour`: `number` — Ora minima selezionabile (0-23). Default: `0`
- `maxHour`: `number` — Ora massima selezionabile (0-24). Default: `24`
- `minMinute`: `number` — Minuto minimo selezionabile (0-59). Default: `0`
- `maxMinute`: `number` — Minuto massimo selezionabile (0-59). Default: `59`

- `timepicker`: `boolean` — Abilita selezione orario insieme alla data. Default: `false`
- `showOnlyTimepicker`: `boolean` — Mostra solo selettore orario senza selezione data. Default: `false`
- `showInline`: `boolean` — Visualizza calendario inline invece che popup. Default: `false`
- `rangeSelection`: `boolean` — Abilita modalità selezione intervallo date. Default: `false`

- `activeLanguageOverride`: `string | undefined` — Sovrascrive il rilevamento automatico lingua con codice locale specifico

- `multipleDatesSeparator`: `string` — Separatore per visualizzare intervalli date. Default: `' - '`

- `calendarClasses`: `string` — Classi CSS aggiuntive per il popup calendario
- `buttonClass`: `string` — Classi CSS aggiuntive per il pulsante toggle calendario

- `searchTextDebounce`: `number` — Tempo debounce in millisecondi per input ricerca. Default: `500`

Tutti gli input standard ereditati da `QuangBaseComponent`:
- `isReadonly`: `boolean` — Rende l'input di sola lettura
- `componentLabel`: `string` — Testo etichetta (supporta chiavi i18n)
- `componentPlaceholder`: `string` — Testo placeholder (supporta chiavi i18n)
- `componentTabIndex`: `number` — Indice tab per accessibilità
- `componentClass`: `string` — Classi CSS aggiuntive per elemento input
- `errorMap`: `Record<string, any>` — Messaggi errore validazione
- `successMessage`: `string` — Testo messaggio successo
- `helpMessage`: `string` — Testo aiuto visualizzato sotto l'input
- `formControl`: `FormControl` — Controllo form reattivo Angular

## Output

- `dateChange`: Emette la data selezionata quando cambia.
- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`

## Esempio d'uso
```html
<quang-date
  [minDate]="minDate"
  [maxDate]="maxDate"
  [errorMap]="errors()"
  [formControl]="testForm.controls.testInput"
  [isReadonly]="isReadonly()"
  [timepicker]="true"
  class="col-6"
  componentLabel="form.label.date"
  successMessage="form.label.success"
>
  <img src="./assets/icons/svg/calendar.svg" />
</quang-date>
```

### Nota
Ricordati di aggiungere l'import:

`node_modules/quang/components/date/global-date.component.scss`

oppure

`quang/components/date/global-date.component.scss`

nel tuo stile globale (consigliata la cartella "vendors").

## Note

Questo componente estende `QuangBaseComponent` ed eredita tutte le sue funzionalità, come etichette, messaggi di errore e messaggi di successo.
