# QuangToastComponent

The `QuangToastComponent` is an overlay component used directly in its parent component and managed via the `QuangToastService`.

## Features

- Toast notifications for displaying messages
- Configurable duration, type, and position (via service)
- Supports multiple toast instances and custom templates

## Inputs

- `showAtLeastFor`: `number` — Minimum time (in milliseconds) to show the toast for. Default: `500`.

> **Note:** All toast configuration (message, type, position, timing, etc.) is provided via the `QuangToastService.openToast()` method, not as component inputs.

## Outputs

- *(none)* — Toast dismissal is managed internally by the service.

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

#### ToastData Options

- `type`: `'success' | 'warning' | 'error'` (required)
- `title?`: `string`
- `position`: `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'top-center' | 'bottom-center'`
- `timing`: `number` (required)
- `text?`: `string`
- `showCloseButton?`: `boolean`
- `customTemplate?`: `TemplateRef<any>`
- `customIcon?`: `string`
- `hideHeader?`: `boolean`
- ...and more (see service for full list)

## Notes

This component uses the `QuangToastService` for managing toast instances dynamically. All toast display logic and configuration is handled via the service.
