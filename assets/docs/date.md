# QuangDateComponent

The `QuangDateComponent` is based on Air Datepicker. It can be fully customized using the input property `datepickerOptions`.

## Features
- Fully customizable datepicker
- Based on Air Datepicker
- Supports date ranges and localization

## Inputs

- `datepickerOptions`: `object` — Configuration options for the datepicker. **(Required)**
- `minDate`: `Date | string` — Minimum selectable date.
- `maxDate`: `Date | string` — Maximum selectable date.
- All standard form/label/validation-related inputs inherited from `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Outputs

- `dateChange`: Emits the selected date when it changes.
- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`

## Usage
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

### Note
Remember to add the import:

`node_modules/quang/components/date/global-date.component.scss`

or

`quang/components/date/global-date.component.scss`

in your global style (suggested "vendors" folder).

## Notes

This component extends the `QuangBaseComponent` and inherits its features, such as label, error messages, and success messages.
