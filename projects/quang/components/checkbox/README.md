# QuangCheckboxComponent

The `QuangCheckboxComponent` can be used as a standard checkbox or as a toggle switch by setting the `checkType` input.

## Features

- Standard checkbox functionality
- Toggle switch mode
- Configurable label position
- Validation feedback (success and error messages)

## Inputs

- `checkType`: Specifies the type of the component. Accepts `'checkbox'` or `'toggle'`. (Required)
- `labelPosition`: Specifies the position of the label. Accepts `'top'`, `'left'`, `'right'`, or `'bottom'`. Default is `'top'`.
- `removeMargin`: Removes the default margin. Accepts a boolean value. Default is `false`.

## Outputs

- `onChangedEventHandler($event: Event)`: Emits the updated value when the checkbox state changes.

## Usage

```html
<quang-checkbox
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  checkType="checkbox"
  class="col-3"
  componentLabel="form.label.toggle"
  formControlName="toggle"
  labelPosition="top"
  successMessage="form.label.success"
/>
<quang-checkbox
  [errorMap]="errors()"
  [isReadonly]="isReadonly()"
  checkType="toggle"
  class="col-6"
  componentLabel="form.label.checkbox"
  formControlName="checkbox"
  labelPosition="left"
  successMessage="form.label.success"
/>
```

## Styling

The component supports the following CSS classes for customization:

- `.label-top`: Positions the label above the checkbox.
- `.label-bottom`: Positions the label below the checkbox.
- `.label-left`: Positions the label to the left of the checkbox.
- `.label-right`: Positions the label to the right of the checkbox.
- `.toggle-wrapper`: Styles the component as a toggle switch.

## Notes

This component extends the `QuangBaseComponent` and inherits its features, such as label, error messages, and success messages.
