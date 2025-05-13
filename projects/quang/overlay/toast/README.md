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

### HTML

```html
<quang-toast />
```

### TypeScript

```typescript
import { inject } from '@angular/core'

import { QuangToastService } from 'quang/overlay/toast'

quangToast = inject(QuangToastService)

 openToast(type: 'success' | 'error') {
  quangToast.openToast({
    type,
    title: type === 'success' ? 'Success' : 'Error',
    position: 'top-right',
    text: 'This is a toast message',
    timing: 5000,
    showCloseButton: true,
  })
}
```

## Notes

This component uses the `QuangToastService` for managing toast instances dynamically.
