# QuangInputComponent

The `QuangInputComponent` must be configured using the `componentType` input property.

## Supported Types

- text
- textarea
- password
- email
- number
- url
- search
- tel
- color

## Inputs

- `componentType`: `'text' | 'textarea' | 'password' | 'email' | 'number' | 'url' | 'search' | 'tel' | 'color'` — Specifies the type of input. **(Required)**
- `maxLengthText`: `number | null` — Maximum length for text input.
- `minLengthText`: `number | null` — Minimum length for text input.
- `minNumber`: `number | undefined` — Minimum value for number input.
- `maxNumber`: `number | undefined` — Maximum value for number input.
- `componentStep`: `number` — Step for number input. Default: `1`.
- `resizable`: `boolean` — If false, disables textarea resizing. Default: `true` (only for textarea).
- `showHidePasswordButton`: `boolean` — Shows/hides the password toggle button when `componentType` is 'password'. Default: `true`.
- `buttonClass`: `string` — Additional CSS classes for the password toggle button.
- All standard form/label/validation-related inputs inherited from `QuangBaseComponent`:
  - `isReadonly`, `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Outputs

- `showPassword`: `EventEmitter<boolean>` — Emitted when the password visibility is toggled (only for password inputs).
- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`

## Usage

```html
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.input"
  componentType="text"
  formControlName="testInput"
/>

<quang-input
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  [maxNumber]="10"
  [minNumber]="0"
  componentLabel="form.label.input"
  componentType="number"
  formControlName="testInput"
  successMessage="form.label.success"
/>

<!-- Password input with toggle button -->
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

<!-- Password input without toggle button -->
<quang-input
  [errorMap]="errors()"
  componentLabel="form.label.password"
  componentType="password"
  formControlName="password"
  [showHidePasswordButton]="false"
/>
```

## Notes

This component extends the `QuangBaseComponent` and inherits its features, such as label and validation messages.

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
