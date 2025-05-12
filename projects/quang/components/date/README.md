# QuangDateComponent

The `QuangDateComponent` is based on Air Datepicker. It can be fully customized using the input property `datepickerOptions`.

## Features
- Fully customizable datepicker
- Based on Air Datepicker
- Supports date ranges and localization

## Inputs
- `datepickerOptions`: Configuration options for the datepicker. (Required)
- `minDate`: Minimum selectable date.
- `maxDate`: Maximum selectable date.

## Outputs
- `dateChange`: Emits the selected date when it changes.

## Usage
```html
<quang-date
  [datepickerOptions]="{ dateFormat: 'dd/mm/yyyy' }"
  [minDate]="'2023-01-01'"
  [maxDate]="'2023-12-31'"
  (dateChange)="onDateChange($event)"
></quang-date>
```

### Note
Remember to add the import:

`node_modules/quang/components/date/global-date.component.scss`

or

`quang/components/date/global-date.component.scss`

in your global style (suggested "vendors" folder).
