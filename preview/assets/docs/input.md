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
- **Icon support**: Uses content projection through slots for customizing the show/hide icons
  - `[show-password]` slot: Content to display when password is hidden (show password icon)
  - `[hide-password]` slot: Content to display when password is visible (hide password icon)
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

- `resizable`: `boolean` — Controls textarea resizing behavior. Default: `true`

### Password-Specific Inputs

- `showHidePasswordButton`: `boolean` — Shows/hides the password toggle button. Default: `true`. **Only applies to**: `password`
- `buttonClass`: `string` — Additional CSS classes for the password toggle button. **Only applies to**: `password`


### Universal Inputs

- `isReadonly`: `boolean` — Makes the input read-only
- `componentLabel`: `string` — Label text (supports i18n keys)
- `componentPlaceholder`: `string` — Placeholder text (supports i18n keys)
- `componentTabIndex`: `number` — Tab index for accessibility
- `componentClass`: `string` — Additional CSS classes for the input element
- `errorMap`: `ErrorData[]` — Validation error messages
- `successMessage`: `string` — Success message text
- `helpMessage`: `string` — Help text displayed as a tooltip or below the input
- `helpMessageTooltip`: `boolean` — If true, help message is shown as a tooltip (with icon); if false, help message is shown inline below the input. Default: `false`
- `formControl`: `FormControl` — Angular reactive form control
- Tooltip icon projection: to display the tooltip icon, use `<ng-content select="[help-icon]" />` in the component template.

## Outputs

- `showPassword`: `EventEmitter<boolean>` — Emitted when the password visibility is toggled (password inputs only)
- `componentBlur`: `EventEmitter<void>` — Emitted when input loses focus

## Usage

### Basic Text Input

```html
<quang-input
  [errorMap]="errors"
  componentLabel="form.label.input"
  componentType="text"
  formControlName="testInput"
/>
```

### Help Message as Tooltip

```html
<quang-input
  [errorMap]="errors"
  componentLabel="form.label.input"
  componentType="text"
  [helpMessage]="'form.help.input'"
  [helpMessageTooltip]="true"
  formControlName="testInput"
>
  <svg-icon src="assets/icons/svg/help.svg" help-icon />
</quang-input>
```

### Help Message Inline

```html
<quang-input
  [errorMap]="errors"
  componentLabel="form.label.input"
  componentType="text"
  [helpMessage]="'form.help.input'"
  [helpMessageTooltip]="false"
  formControlName="testInput"
/>
```

### Password Input with Toggle

```html
<quang-input
  [errorMap]="errors"
  [showHidePasswordButton]="true"
  (showPassword)="onToggleShowPassword($event)"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
>
  <!-- Content for the show/hide password button -->
  <svg-icon src="assets/icons/svg/visibility.svg" show-password />
  <svg-icon src="assets/icons/svg/visibility_off.svg" hide-password />
</quang-input>
```

#### TypeScript Example

```typescript
export class MyComponent {
  errors: ErrorData[] = [
    { type: 'required', message: 'Password is required' },
    { type: 'minlength', message: 'Password must be at least 8 characters long' }
  ]
  
  showPassword = signal<boolean>(false)

  onToggleShowPassword(isVisible: boolean): void {
    this.showPassword.set(isVisible)
  }
}
```

### Number Input with Constraints

```html
<quang-input
  [componentStep]="5"
  [errorMap]="errors"
  [maxNumber]="100"
  [minNumber]="0"
  componentLabel="form.label.quantity"
  componentType="number"
  formControlName="quantity"
/>
```

### Textarea

```html
<quang-input
  [errorMap]="errors"
  [maxLengthText]="500"
  componentLabel="form.label.description"
  componentType="textarea"
  formControlName="description"
/>
```

### Type-Specific Features

The component supports various input types with specific behaviors:

- **text, email, url, search, tel**: Support text length constraints
- **password**: Built-in show/hide toggle functionality with icon support
- **number**: Step controls and min/max validation
- **textarea**: Multi-line support with resizable control
- **color**: Color picker input
