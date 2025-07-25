# QuangInputComponent

The `QuangInputComponent` must be configured using the `componentType` input property.

## Supported Types

The component supports the following input types, each with specific behaviors and configurations:

### Text Input Types
- **text** — Standard text input for general text entry
- **email** — Email input with built-in email validation
- **password** — Password input with optional show/hide toggle functionality
- **url** — URL input with URL format validation
- **search** — Search input with native search behavior
- **tel** — Telephone number input

### Numeric Input Types
- **number** — Numeric input with step controls and min/max validation

### Special Input Types
- **textarea** — Multi-line text input with resizable functionality
- **color** — Color picker input

### Type-Specific Features

#### Textarea (`componentType="textarea"`)
- **Multi-line support**: Automatically expands for content
- **Resizable control**: Use `resizable` input to enable/disable manual resizing
- **No min/max number constraints**: Number-related inputs are ignored

#### Password (`componentType="password"`)
- **Toggle visibility**: Built-in show/hide password functionality
- **Icon support**: Custom icons through content projection
- **Security**: Masks input by default, reveals on toggle

#### Number (`componentType="number"`)
- **Step controls**: Use `componentStep` to define increment/decrement values
- **Range validation**: Set `minNumber` and `maxNumber` for value constraints
- **Decimal support**: Supports decimal values when step allows

#### Email (`componentType="email"`)
- **Format validation**: Automatic email format validation
- **Autocomplete**: Enhanced with email-specific autocomplete

#### Search (`componentType="search"`)
- **Clear button**: Native clear functionality on supported browsers
- **Search behavior**: Platform-specific search enhancements

## Inputs

### Core Configuration
- `componentType`: `'text' | 'textarea' | 'password' | 'email' | 'number' | 'url' | 'search' | 'tel' | 'color'` — Specifies the type of input. **(Required)**

### Text-Specific Inputs
- `maxLengthText`: `number | null` — Maximum length for text input. Applies to: `text`, `textarea`, `email`, `password`, `url`, `search`, `tel`
- `minLengthText`: `number | null` — Minimum length for text input. Applies to: `text`, `textarea`, `email`, `password`, `url`, `search`, `tel`

### Number-Specific Inputs
- `minNumber`: `number | undefined` — Minimum value for number input. **Only applies to**: `number`
- `maxNumber`: `number | undefined` — Maximum value for number input. **Only applies to**: `number`
- `componentStep`: `number` — Step increment for number input. Default: `1`. **Only applies to**: `number`

### Textarea-Specific Inputs
- `resizable`: `boolean` — Controls textarea resizing behavior. Default: `true`. **Only applies to**: `textarea`
  - `true`: User can manually resize the textarea
  - `false`: Textarea size is fixed (adds `no-resize` class)

### Password-Specific Inputs
- `showHidePasswordButton`: `boolean` — Shows/hides the password toggle button. Default: `true`. **Only applies to**: `password`
- `buttonClass`: `string` — Additional CSS classes for the password toggle button. **Only applies to**: `password`

### Universal Inputs
All input types inherit these standard inputs from `QuangBaseComponent`:
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

- `showPassword`: `EventEmitter<boolean>` — Emitted when the password visibility is toggled (only for password inputs).
- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`

## Usage

### Basic Text Input
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.input"
  componentType="text"
  formControlName="testInput"
/>
```

### Number Input with Constraints
```html
<quang-input
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  [maxNumber]="100"
  [minNumber]="0"
  [componentStep]="5"
  componentLabel="form.label.quantity"
  componentType="number"
  formControlName="quantity"
  successMessage="form.label.success"
/>
```

### Textarea with Size Control
```html
<!-- Resizable textarea -->
<quang-input
  [errorMap]="errors()"
  [maxLengthText]="500"
  [resizable]="true"
  componentLabel="form.label.description"
  componentType="textarea"
  formControlName="description"
  helpMessage="form.help.maxChars"
/>

<!-- Fixed-size textarea -->
<quang-input
  [errorMap]="errors()"
  [resizable]="false"
  componentLabel="form.label.comment"
  componentType="textarea"
  formControlName="comment"
/>
```

### Email Input with Validation
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.email"
  componentType="email"
  formControlName="email"
  componentPlaceholder="form.placeholder.email"
/>
```

### Password Input with Toggle
```html
<!-- Password with toggle button -->
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
  [showHidePasswordButton]="true"
  (showPassword)="onToggleShowPassword($event)"
>
  <!-- Icon for password toggle button -->
  @if (showPassword()) {
    <svg-icon src="assets/icons/svg/visibility_off.svg" />
  } @else {
    <svg-icon src="assets/icons/svg/visibility.svg" />
  }
</quang-input>

<!-- Password without toggle button -->
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
  [showHidePasswordButton]="false"
/>
```

### URL Input
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.website"
  componentType="url"
  formControlName="website"
  componentPlaceholder="form.placeholder.url"
/>
```

### Search Input
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.search"
  componentType="search"
  formControlName="searchTerm"
  componentPlaceholder="form.placeholder.search"
/>
```

### Telephone Input
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.phone"
  componentType="tel"
  formControlName="phone"
  componentPlaceholder="form.placeholder.phone"
/>
```

### Color Input
```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.color"
  componentType="color"
  formControlName="favoriteColor"
/>
```

## Notes

This component extends the `QuangBaseComponent` and inherits its features, such as label and validation messages.

### Input Type Behaviors

#### Text-based Inputs (`text`, `email`, `url`, `search`, `tel`)
- Support `maxLengthText` and `minLengthText` constraints
- Automatically apply HTML5 validation for `email` and `url` types
- `search` type provides native clear button on supported browsers
- All text inputs disable autocomplete by default (`autocomplete="off"`)

#### Textarea Multi-line Management
- **Automatic expansion**: Content automatically wraps to new lines
- **Manual resizing**: Users can drag corners to resize when `resizable="true"`
- **Fixed dimensions**: Set `resizable="false"` to prevent user resizing
- **Character limits**: Use `maxLengthText` for character counting
- **Styling**: Apply custom classes via `componentClass` for specific dimensions

#### Number Input Behavior
- **Step controls**: Browser may show increment/decrement arrows
- **Validation**: Automatically validates min/max ranges
- **Decimal precision**: Controlled by `componentStep` value
- **Invalid input handling**: Non-numeric input is rejected by the browser

#### Validation States
The component automatically applies Bootstrap validation classes:
- `.is-valid` — Applied when form control is valid and touched
- `.is-invalid` — Applied when form control has errors and touched
- Validation messages are displayed below the input

#### Accessibility Features
- **Labels**: Properly associated with input elements via `htmlFor`
- **ARIA attributes**: Required state and validation messages
- **Tab navigation**: Controlled via `componentTabIndex`
- **Screen reader support**: Error and help messages are announced

### CSS Classes and Styling

#### Applied Classes
- `.form-control` — Bootstrap form control styling
- `.with-button-password` — Applied to password inputs with toggle button
- `.no-resize` — Applied to textareas when `resizable="false"`
- Custom classes via `componentClass` input

#### Container Structure
```html
<!-- For inputs with buttons (password toggle) -->
<div class="input-container">
  <input class="form-control" />
  <button class="btn btn-outline-secondary">...</button>
</div>

<!-- For standalone inputs -->
<input class="form-control" />
```

### Password Toggle Functionality

When using `componentType="password"`, you can add a show/hide password button by:

1. Setting `showHidePasswordButton="true"` (default)
2. Providing an icon through content projection using `<ng-content></ng-content>`
3. Listening to the `showPassword` output event to track visibility state
4. The button will automatically appear/disappear based on:
   - The input type being 'password'
   - The `showHidePasswordButton` input being true
   - The input not being disabled

#### Features:
- **Toggle Functionality**: Switches the input type between 'password' and 'text'
- **Event Emission**: Emits `showPassword` event with the current visibility state
- **Flexible Icon Support**: Use any icon library through content projection
- **Accessibility**: Includes proper ARIA labels for screen readers
- **Validation Support**: Password toggle button inherits validation styles (success/error borders)

#### Example with Signal-based State Management:
```typescript
// Component TypeScript
showPassword = signal<boolean>(false);

onToggleShowPassword(isVisible: boolean): void {
  this.showPassword.set(isVisible);
}
```

### Best Practices

#### Input Type Selection
- Use `email` for email addresses to leverage built-in validation
- Use `tel` for phone numbers to trigger numeric keyboards on mobile
- Use `url` for website addresses to get proper validation
- Use `search` for search fields to get native clear functionality
- Use `password` with toggle for better user experience

#### Textarea Configuration
- Set `resizable="false"` for consistent layouts
- Use `maxLengthText` to prevent excessive content
- Consider UX when allowing/disallowing resizing

#### Number Input Guidelines
- Always set meaningful `minNumber` and `maxNumber` values
- Use appropriate `componentStep` values (e.g., 0.01 for currency)
- Consider using `text` type with custom validation for complex number formats

#### Validation Strategy
- Combine HTML5 validation with Angular validators
- Provide clear error messages in `errorMap`
- Use `helpMessage` for input guidelines
- Show `successMessage` for positive feedback

### Troubleshooting

#### Common Issues

**Password toggle button not showing:**
- Ensure `componentType="password"`
- Verify `showHidePasswordButton="true"`
- Check that content is projected for the icon
- Confirm input is not disabled

**Textarea not resizing:**
- Check `resizable` input value
- Verify CSS doesn't override resize property
- Ensure parent container allows overflow

**Number validation not working:**
- Confirm `componentType="number"`
- Check that min/max values are properly set
- Verify step value is appropriate for the expected range

**Styling issues:**
- Use `componentClass` for custom input styling
- Use `buttonClass` for password toggle button styling
- Check Bootstrap version compatibility
- Verify CSS specificity for custom styles

#### Performance Considerations
- Use `OnPush` change detection (already implemented)
- Avoid frequent re-creation of validation objects
- Consider debouncing for search inputs
- Use reactive forms for better performance with complex validation
