# Componente QuangDate

Il `QuangDateComponent` si basa su Air Datepicker. Può essere completamente personalizzato tramite la proprietà di input `datepickerOptions`.

## Funzionalità
- Datepicker completamente personalizzabile
- Basato su Air Datepicker
- Supporta intervalli di date e localizzazione

## Input

- `datepickerOptions`: `object` — Opzioni di configurazione per il datepicker. **(Obbligatorio)**
- `minDate`: `Date | string` — Data minima selezionabile.
- `maxDate`: `Date | string` — Data massima selezionabile.
- Tutti gli input standard di form/etichetta/validazione ereditati da `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

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
