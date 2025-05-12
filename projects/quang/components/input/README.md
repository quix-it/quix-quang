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
- `componentType`: Specifies the type of input. Accepts one of the supported types. (Required)
- `placeholder`: Placeholder text for the input field.
- `disabled`: Disables the input field. Default is `false`.

## Outputs
- `valueChange`: Emits the updated value when the input changes.

## Usage
```html
<quang-input
  [componentType]="'text'"
  [placeholder]="'Enter your name'"
  [disabled]="false"
  (valueChange)="onValueChange($event)"
></quang-input>
```

## Notes
This component extends the `QuangBaseComponent` and inherits its features, such as label and validation messages.
