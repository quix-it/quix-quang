# QuangCheckboxComponent

The `QuangCheckboxComponent` is a versatile checkbox and toggle switch component that provides flexible label positioning, comprehensive validation feedback, and seamless integration with Angular forms. It supports both traditional checkbox and modern toggle switch modes with extensive customization options.

## Inputs

- `checkType`: `'checkbox' | 'toggle'` — Specifies the input type. Checkbox renders as traditional checkmark input, toggle renders as modern switch control. **(Required)**
- `labelPosition`: `'top' | 'left' | 'right' | 'bottom'` — Position of the label relative to the input control. Affects layout direction and spacing. Default: `'top'`
- `removeMargin`: `boolean` — Removes default bottom margin and form-check class. Useful for custom layouts or tight spacing requirements. Default: `false`
- `isReadonly`: `boolean` — Set component to read-only mode. Inherited from `QuangBaseComponent`
- `componentLabel`: `string` — Label text for the component. Inherited from `QuangBaseComponent`
- `componentPlaceholder`: `string` — Placeholder text for the input. Inherited from `QuangBaseComponent`
- `componentTabIndex`: `number` — Tab index for accessibility. Inherited from `QuangBaseComponent`
- `componentClass`: `string | string[]` — Additional CSS classes. Inherited from `QuangBaseComponent`
- `errorMap`: `ErrorData[]` — Custom error messages. Inherited from `QuangBaseComponent`
- `successMessage`: `string` — Success message to display. Inherited from `QuangBaseComponent`
- `helpMessage`: `string` — Help text displayed as a tooltip or below the input. Inherited from `QuangBaseComponent`
- `helpMessageTooltip`: `boolean` — If true, help message is shown as a tooltip (with icon); if false, help message is shown inline below the input. Default: `false`. Inherited from `QuangBaseComponent`
- `formControl`: `FormControl` — Form control for reactive forms. Inherited from `QuangBaseComponent`

## Outputs

- `changedHandler`: `EventEmitter<boolean>` — Emitted when checkbox state changes. Provides the new boolean value (true for checked, false for unchecked)
- `componentBlur`: `EventEmitter<void>` — Emitted when component loses focus. Inherited from `QuangBaseComponent`

## Usage


### Basic Checkbox
```html
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.agreeToTerms"
  formControlName="agreeToTerms"
/>
```

### Help Message as Tooltip
```html
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.agreeToTerms"
  [helpMessage]="'form.help.agreeToTerms'"
  [helpMessageTooltip]="true"
  formControlName="agreeToTerms"
>
  <svg-icon src="assets/icons/svg/help.svg" help-icon />
</quang-checkbox>
```

### Help Message Inline
```html
<quang-checkbox
  checkType="checkbox"
  componentLabel="form.label.agreeToTerms"
  [helpMessage]="'form.help.agreeToTerms'"
  [helpMessageTooltip]="false"
  formControlName="agreeToTerms"
/>
```

### Toggle Switch

```html
<quang-checkbox
  checkType="toggle"
  componentLabel="form.label.enableNotifications"
  labelPosition="left"
  formControlName="notifications"
>
</quang-checkbox>
```

#### TypeScript Example

```typescript
export class MyComponent {
  form = this.fb.group({
    agreeToTerms: [false, Validators.requiredTrue],
    enableNotifications: [true]
  })

  onToggleChange(isChecked: boolean): void {
    console.log('Checkbox state changed:', isChecked)
    // Handle state change
  }
}
```

### Translation Integration

The component uses QuangTranslationService for all text content:

- **Automatic Translation**: All labels, help text, and error messages are automatically translated
- **Key Support**: Use translation keys for all text content
- **Fallback Handling**: Provides graceful fallback when translations are unavailable
- **Dynamic Language**: Responds to language changes without component reload
