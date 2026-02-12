# QuangPopoverComponent

The `QuangPopoverComponent` is a base overlay popover with its own style, used via the `[quangPopover]` directive.

## Features

- Popover overlay for displaying additional information
- Configurable trigger and position (via directive)
- Supports custom content via `TemplateRef`

## Inputs (via Directive)

- `quangPopover`: `TemplateRef<any> | null` (required) — The template to display in the popover.
- `overlayPosition`: `string` — Position of the popover. Accepts values like `'top'`, `'top-left'`, `'top-right'`, `'bottom'`, `'bottom-left'`, `'bottom-right'`, `'left'`, `'right'`
- `showMethod`: `string` — Trigger for the popover. Accepts values like `'click'`, `'hover'`, `'focus'`.
- `payload`: `any` — Optional data to pass to the popover template.

## Outputs

- _(none)_ — The popover closes automatically when the user clicks outside or triggers the close logic.

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

This component is used via the `[quangPopover]` directive and extends the `QuangBaseOverlayComponent`, inheriting features such as dynamic positioning and styling. The popover content is always provided as a `TemplateRef`.
