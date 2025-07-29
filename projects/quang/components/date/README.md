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
- `errorMap`: `Record<string, any>` — Validation error messages
- `successMessage`: `string` — Success message text
- `helpMessage`: `string` — Help text displayed below the input
- `formControl`: `FormControl` — Angular reactive form control

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
  [timepicker]="true"
  [minDate]="minDate"
  [maxDate]="maxDate"
  componentLabel="form.label.appointment"
  dateFormat="dd/MM/yyyy"
  timeFormat="HH:mm"
  formControlName="appointmentDateTime"
>
  <img src="assets/icons/svg/calendar.svg" alt="Calendar" />
</quang-date>
```

### Date Range Selection
```html
<quang-date
  [errorMap]="errors()"
  [rangeSelection]="true"
  [minDate]="startDate"
  [maxDate]="endDate"
  componentLabel="form.label.dateRange"
  multipleDatesSeparator=" to "
  formControlName="dateRange"
>
  <i class="fas fa-calendar-alt"></i>
</quang-date>
```

### Time-Only Picker
```html
<quang-date
  [errorMap]="errors()"
  [showOnlyTimepicker]="true"
  [minHour]="9"
  [maxHour]="17"
  [minMinute]="0"
  [maxMinute]="59"
  componentLabel="form.label.meetingTime"
  timeFormat="HH:mm"
  formControlName="meetingTime"
>
  <svg-icon src="assets/icons/svg/clock.svg" />
</quang-date>
```

### Inline Calendar
```html
<quang-date
  [errorMap]="errors()"
  [showInline]="true"
  [timepicker]="true"
  componentLabel="form.label.eventDate"
  formControlName="eventDate"
  calendarClasses="custom-calendar-style"
/>
```

### Custom Date Format and Validation
```html
<quang-date
  [errorMap]="errors()"
  [minDate]="minAllowedDate"
  [maxDate]="maxAllowedDate"
  dateFormat="yyyy-MM-dd"
  invalidDateMessage="Please enter a valid date in YYYY-MM-DD format"
  componentLabel="form.label.deadline"
  componentPlaceholder="YYYY-MM-DD"
  formControlName="deadline"
>
  <svg-icon src="assets/icons/svg/calendar.svg" />
</quang-date>
```

### Advanced Configuration with Air Datepicker Options
```html
<quang-date
  [errorMap]="errors()"
  [datepickerOptions]="customDatepickerOptions"
  componentLabel="form.label.advancedDate"
  formControlName="advancedDate"
>
  <svg-icon src="assets/icons/svg/calendar.svg" />
</quang-date>
```

#### TypeScript Configuration Example
```typescript
customDatepickerOptions: QuangDatepickerOptions = {
  view: 'months',
  minView: 'months',
  dateFormat: 'MM/yyyy',
  autoClose: true,
  position: 'top center',
  offset: 10,
  showOtherMonths: false,
  selectOtherMonths: false,
  moveToOtherMonthsOnSelect: false
};
```

### Localization Example
```html
<!-- Use specific locale -->
<quang-date
  [errorMap]="errors()"
  activeLanguageOverride="it"
  componentLabel="form.label.dataCompleanno"
  formControlName="dataCompleanno"
>
  <svg-icon src="assets/icons/svg/calendar.svg" />
</quang-date>

<!-- Use QuangTranslationService automatic detection -->
<quang-date
  [errorMap]="errors()"
  componentLabel="form.label.date"
  formControlName="date"
>
  <svg-icon src="assets/icons/svg/calendar.svg" />
</quang-date>
```

## Installation & Setup

### Required Styles
Add the global date component styles to your application:

**Option 1: In angular.json**
```json
"styles": [
  "node_modules/quang/components/date/global-date.component.scss"
]
```

**Option 2: In your global styles file**
```scss
@import 'quang/components/date/global-date.component.scss';
```

**Option 3: In vendors folder (recommended)**
```scss
// src/sass/vendors/_date-component.scss
@import 'node_modules/quang/components/date/global-date.component.scss';
```

### Air Datepicker Integration
The component automatically handles Air Datepicker setup and configuration. Supported locales include:
- English (en) - Default
- Italian (it)
- French (fr)
- Auto-detection based on browser/QuangTranslationService

## Component Behavior

### Date Format Patterns
Uses [Unicode Date Field Symbol Table](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table):

| Pattern | Description | Example |
|---------|-------------|---------|
| `dd/MM/yyyy` | Day/Month/Year | 25/12/2023 |
| `MM/dd/yyyy` | Month/Day/Year | 12/25/2023 |
| `yyyy-MM-dd` | ISO Date | 2023-12-25 |
| `dd MMM yyyy` | Day Month Year | 25 Dec 2023 |
| `EEEE, dd MMMM yyyy` | Full Date | Monday, 25 December 2023 |

### Time Format Patterns
| Pattern | Description | Example |
|---------|-------------|---------|
| `HH:mm` | 24-hour format | 14:30 |
| `hh:mm a` | 12-hour format | 02:30 PM |
| `HH:mm:ss` | With seconds | 14:30:45 |

### Display Modes

#### Single Date Mode (Default)
- Returns: `Date | null`
- User selects one date
- Input shows formatted date string

#### Range Selection Mode
- Returns: `DateRange | null` = `{ dateFrom: string | null, dateTo: string | null }`
- User selects start and end dates
- Input shows both dates with separator
- Visual range highlighting in calendar

#### Time-Only Mode
- Returns: `string` in specified time format
- No date selection available
- Only time picker controls visible

#### Inline Mode
- Calendar always visible
- No popup behavior
- Useful for dashboard widgets or dedicated date selection areas

### Validation Integration

#### Built-in Validation
- **Date Range**: Automatic validation against `minDate`/`maxDate`
- **Time Range**: Validation against `minHour`/`maxHour`, `minMinute`/`maxMinute`
- **Format Validation**: Invalid date format detection with custom messages

#### Custom Validation
```typescript
// Custom validator example
dateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  
  const selectedDate = new Date(value);
  const today = new Date();
  
  if (selectedDate < today) {
    return { pastDate: { message: 'Date cannot be in the past' } };
  }
  
  return null;
}
```

### Accessibility Features

#### Keyboard Navigation
- **Tab**: Navigate to/from date input
- **Enter/Space**: Open calendar when focused on button
- **Arrow Keys**: Navigate calendar dates
- **Escape**: Close calendar popup

#### Screen Reader Support
- **ARIA Labels**: Calendar button properly labeled
- **Date Announcements**: Selected dates announced
- **Error Messages**: Validation errors announced
- **Help Text**: Additional guidance provided

#### Focus Management
- **Focus Trapping**: Keyboard focus contained within open calendar
- **Focus Return**: Focus returns to trigger element when calendar closes
- **Visual Indicators**: Clear focus styling

### Performance Considerations

#### Debouncing
- **Search Input**: Configurable debounce for typed date input
- **Validation**: Debounced validation to prevent excessive API calls
- **Change Detection**: OnPush strategy for optimal performance

#### Memory Management
- **Air Datepicker Cleanup**: Automatic instance destruction
- **Event Listeners**: Proper cleanup on component destruction
- **Subscription Management**: RxJS subscriptions properly handled

## Best Practices

### Date Format Selection
- **Use consistent formats**: Stick to one format throughout your application
- **Consider locale**: Match user's expected date format for their region
- **ISO format**: Use `yyyy-MM-dd` for data storage and API communication
- **User-friendly display**: Use localized formats like `dd/MM/yyyy` for UI

### Range Selection Guidelines
- **Clear separators**: Use intuitive separators like " to " or " - "
- **Validation**: Always validate that end date is after start date
- **User feedback**: Provide clear visual indication of selected range
- **Default behavior**: Consider setting reasonable default ranges

### Time Picker Configuration
- **Business hours**: Use `minHour`/`maxHour` to limit to relevant times
- **Step intervals**: Configure minute steps for appointment scheduling
- **Format consistency**: Match time format with user expectations

### Internationalization
- **Automatic detection**: Let QuangTranslationService handle locale automatically
- **Override sparingly**: Only use `activeLanguageOverride` for specific cases
- **Test multiple locales**: Verify date formats work across all supported languages

### Performance Optimization
- **Debouncing**: Increase `searchTextDebounce` for slower networks
- **Inline calendars**: Use sparingly as they're always rendered
- **Air Datepicker options**: Avoid complex configurations that impact performance

## Troubleshooting

### Common Issues

#### Calendar not showing
- **Check styles**: Ensure global styles are imported
- **Z-index conflicts**: Calendar popup may be behind other elements
- **Container overflow**: Parent containers may clip calendar popup
- **Content projection**: Verify icon/content is projected correctly

#### Date format issues
- **Invalid patterns**: Check Unicode date pattern syntax
- **Locale mismatch**: Format patterns may not match selected locale
- **Parsing errors**: Ensure `invalidDateMessage` provides clear guidance

#### Validation problems
- **Min/max dates**: Verify date constraints are properly set
- **Time constraints**: Check hour/minute ranges are logical
- **Custom validators**: Ensure proper integration with Angular forms

#### Localization not working
- **QuangTranslationService**: Check service is properly configured
- **Language fallback**: Browser language detection may fail
- **Manual override**: Use `activeLanguageOverride` as fallback

### Performance Issues

#### Slow calendar opening
- **Reduce options complexity**: Simplify `datepickerOptions`
- **Debounce optimization**: Adjust `searchTextDebounce` value
- **Check for memory leaks**: Ensure proper component cleanup

#### Memory usage
- **Air Datepicker instances**: Component handles cleanup automatically
- **Event listeners**: Should be cleaned up on destroy
- **Large date ranges**: Consider pagination for extensive date selections

### Styling Problems

#### Button styling
- **Use `buttonClass`**: Add custom classes via input
- **Bootstrap conflicts**: Check for conflicting CSS rules
- **Responsive design**: Test on different screen sizes

#### Calendar appearance
- **Global styles**: Ensure proper SCSS import
- **Custom themes**: Use `calendarClasses` for theming
- **Mobile responsiveness**: Test calendar popup on mobile devices

### Integration Issues

#### Form validation
- **Error messages**: Use `errorMap` for custom validation messages
- **Success states**: Configure `successMessage` for positive feedback
- **Help text**: Use `helpMessage` for user guidance

#### API integration
- **Date serialization**: Use consistent format for API calls
- **Time zones**: Handle time zone conversion properly
- **Range queries**: Format date ranges correctly for backend

#### Third-party conflicts
- **CSS frameworks**: Check for styling conflicts
- **Date libraries**: Avoid conflicts with other date manipulation libraries
- **Event handling**: Ensure proper event propagation

## Advanced Configuration

### Custom Air Datepicker Options
```typescript
// Advanced configuration example
advancedOptions: QuangDatepickerOptions = {
  view: 'years',
  minView: 'months',
  maxView: 'years',
  startDate: new Date(),
  firstDay: 1, // Monday as first day
  weekends: [6, 0], // Saturday, Sunday
  dateFormat: 'dd/MM/yyyy',
  altField: true,
  altFieldDateFormat: 'yyyy-MM-dd',
  showOtherMonths: true,
  selectOtherMonths: true,
  moveToOtherMonthsOnSelect: true,
  showOtherYears: true,
  selectOtherYears: true,
  moveToOtherYearsOnSelect: true,
  minDate: new Date(),
  maxDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // +1 year
  disabledDates: [new Date('2023-12-25')], // Christmas
  position: 'bottom center',
  offset: 12,
  autoClose: true,
  toggleSelected: false
};
```

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
