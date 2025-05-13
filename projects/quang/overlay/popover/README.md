# QuangPopoverComponent

The `QuangPopoverComponent` is a base overlay popover with its own style.

## Features

- Popover overlay for displaying additional information
- Configurable trigger and position
- Supports custom content via `TemplateRef`

## Inputs

- `overlayPosition`: Specifies the position of the popover. Accepts values like `'top'`, `'bottom'`, `'left'`, `'right'`.
- `showMethod`: Specifies the trigger for the popover. Accepts values like `'click'`, `'hover'`, `'focus'`.

## Outputs

- `onClose`: Emits an event when the popover is closed.

## Usage

```html
<button
  [overlayPosition]="'top'"
  [quangPopover]="popoverTemplate"
  [showMethod]="'click'"
>
  Open Popover
</button>

<ng-template #popoverTemplate>
  <div>Popover Content</div>
</ng-template>
```

## Notes

This component extends the `QuangBaseOverlayComponent` and inherits its features, such as dynamic positioning and styling.
