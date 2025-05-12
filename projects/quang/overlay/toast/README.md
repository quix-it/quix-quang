# QuangToastComponent

The `QuangToastComponent` is an overlay component used directly in its parent component.

## Features
- Toast notifications for displaying messages
- Configurable duration and position
- Supports multiple toast instances

## Inputs
- `message`: The message to display in the toast. (Required)
- `duration`: Duration for which the toast is visible. Default is `3000` milliseconds.
- `position`: Specifies the position of the toast. Accepts values like `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`.

## Outputs
- `onDismiss`: Emits an event when the toast is dismissed.

## Usage
```html
<quang-toast
  [message]="'This is a toast message'"
  [duration]="5000"
  [position]="'top-right'"
  (onDismiss)="handleToastDismiss()"
></quang-toast>
```

## Notes
This component uses the `QuangToastService` for managing toast instances dynamically.
