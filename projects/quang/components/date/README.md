# QuangDateComponent

The `QuangDateComponent` is a comprehensive date and time picker based on [Air Datepicker](https://air-datepicker.com/docs). It provides full customization capabilities, internationalization support, and various display modes including inline calendars and time-only pickers.

## Supported Features

### Date Selection Modes

- **Single Date**: Select a single date
- **Date Range**: Select start and end dates with range highlighting
- **Inline Calendar**: Display calendar directly in the page without popup
- **Time Only**: Show only time picker without date selection

### Input Formats

- **Custom Date Formats**: Configurable display formats using Unicode date patterns
- **Time Formats**: Separate time format configuration
- **Invalid Date Handling**: Custom messages for invalid date inputs
- **Search Input**: Live search with debouncing for date input

### Internationalization

- **Multi-language Support**: Integrated with QuangTranslationService
- **Locale Override**: Manual locale setting capability
- **Browser Language Fallback**: Automatic language detection

### Customization

- **Icon Support**: Custom calendar icons through content projection
- **CSS Styling**: Custom classes for calendar and button elements
- **Position Control**: Configurable popup positioning
- **Air Datepicker Integration**: Full access to Air Datepicker options

## Inputs

- `datepickerOptions`: `QuangDatepickerOptions | undefined` — Full Air Datepicker configuration object for advanced customization. **Overrides component defaults**

- `dateFormat`: `string` — Display format for dates using [Unicode date patterns](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table). Default: `'dd/MM/yyyy'`
- `timeFormat`: `string` — Display format for time using Unicode patterns. Default: `'HH:mm'`
- `invalidDateMessage`: `string` — Message shown when user enters invalid date format

- `minDate`: `Date | undefined` — Earliest selectable date
- `maxDate`: `Date | undefined` — Latest selectable date
- `minHour`: `number` — Minimum selectable hour (0-23). Default: `0`
- `maxHour`: `number` — Maximum selectable hour (0-24). Default: `24`
- `minMinute`: `number` — Minimum selectable minute (0-59). Default: `0`
- `maxMinute`: `number` — Maximum selectable minute (0-59). Default: `59`

- `timepicker`: `boolean` — Enable time selection alongside date. Default: `false`
- `showOnlyTimepicker`: `boolean` — Show only time picker without date selection. Default: `false`
- `showInline`: `boolean` — Display calendar inline instead of popup. Default: `false`
- `rangeSelection`: `boolean` — Enable date range selection mode. Default: `false`

- `activeLanguageOverride`: `string | undefined` — Override automatic language detection with specific locale code

- `multipleDatesSeparator`: `string` — Separator for displaying date ranges. Default: `' - '`

- `calendarClasses`: `string` — Additional CSS classes for the calendar popup
- `buttonClass`: `string` — Additional CSS classes for the calendar toggle button

- `searchTextDebounce`: `number` — Debounce time in milliseconds for search input. Default: `500`

All standard inputs inherited from `QuangBaseComponent`:

- `isReadonly`: `boolean` — Makes the input read-only
- `componentLabel`: `string` — Label text (supports i18n keys)
- `componentPlaceholder`: `string` — Placeholder text (supports i18n keys)
- `componentTabIndex`: `number` — Tab index for accessibility
- `componentClass`: `string` — Additional CSS classes for the input element
- `errorMap`: `ErrorData[]` — Validation error messages
- `successMessage`: `string` — Success message text
- `helpMessage`: `string` — Help text displayed below the input
- `helpMessageTooltip`: `boolean` — If true, displays help message as a tooltip (with projected icon); if false, displays help message inline below the input. Default: `false`
- `formControl`: `FormControl` — Angular reactive form control
- Tooltip icon projection: to display the tooltip icon, use `<ng-content select="[help-icon]" />` in the component template.

## Outputs

- `dateChange`: `EventEmitter<Date | DateRange | null>` — Emitted when the selected date/range changes
  - Single date mode: Emits `Date | null`
  - Range mode: Emits `DateRange | null` with `{ dateFrom: string | null, dateTo: string | null }`
- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`: `EventEmitter<void>` — Emitted when input loses focus

## Usage

### Basic Date Picker

```html
<quang-date
  [errorMap]="errors()"
  componentLabel="form.label.birthdate"
  formControlName="birthdate"
>
  <svg-icon src="assets/icons/svg/calendar.svg" />
</quang-date>
```

### Date Picker with Time Selection

```html
<quang-date
  [errorMap]="errors()"
  [maxDate]="maxDate"
  [minDate]="minDate"
  [timepicker]="true"
  componentLabel="form.label.appointment"
  dateFormat="dd/MM/yyyy"
  formControlName="appointmentDateTime"
  timeFormat="HH:mm"
>
  <img
    alt="Calendar"
    src="assets/icons/svg/calendar.svg"
  />
</quang-date>
```

### Date Range Selection

```html
<quang-date
  [errorMap]="errors()"
  [maxDate]="endDate"
  [minDate]="startDate"
  [rangeSelection]="true"
  componentLabel="form.label.dateRange"
  formControlName="dateRange"
  multipleDatesSeparator=" to "
>
  <i class="fas fa-calendar-alt"></i>
</quang-date>
```

## Component Behavior

### Date Format Patterns

Uses [Unicode Date Field Symbol Table](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table):

| Pattern              | Description    | Example                  |
| -------------------- | -------------- | ------------------------ |
| `dd/MM/yyyy`         | Day/Month/Year | 25/12/2023               |
| `MM/dd/yyyy`         | Month/Day/Year | 12/25/2023               |
| `yyyy-MM-dd`         | ISO Date       | 2023-12-25               |
| `dd MMM yyyy`        | Day Month Year | 25 Dec 2023              |
| `EEEE, dd MMMM yyyy` | Full Date      | Monday, 25 December 2023 |

### Time Format Patterns

| Pattern    | Description    | Example  |
| ---------- | -------------- | -------- |
| `HH:mm`    | 24-hour format | 14:30    |
| `hh:mm a`  | 12-hour format | 02:30 PM |
| `HH:mm:ss` | With seconds   | 14:30:45 |

### Custom Styling

```scss
// Custom calendar styling
.custom-calendar-style {
  .air-datepicker {
    border: 2px solid #007bff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    .air-datepicker-cell.-selected- {
      background: linear-gradient(45deg, #007bff, #0056b3);
      color: white;
    }

    .air-datepicker-cell.-in-range- {
      background-color: rgba(0, 123, 255, 0.1);
    }
  }
}
```

## Notes

This component extends the `QuangBaseComponent` and inherits its features, such as label, error messages, and success messages.

### Air Datepicker Integration

- **Full API Access**: Use `datepickerOptions` for complete Air Datepicker configuration
- **Event Handling**: Component manages `onSelect` and `onHide` events automatically
- **Localization**: Automatic locale configuration with fallback options
- **Instance Management**: Air Datepicker instances are properly created and destroyed

### Form Integration

- **Reactive Forms**: Full support for Angular reactive forms
- **Template-driven Forms**: Compatible with template-driven forms
- **Validation**: Integrates with Angular validation system
- **Change Detection**: Optimized with OnPush strategy

### QuangTranslationService Integration

- **Automatic Language**: Uses active language from translation service
- **Label Translation**: All labels support i18n keys
- **Message Translation**: Error and help messages support translation
- **Locale Matching**: Matches translation service locale with calendar locale
