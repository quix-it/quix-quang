# QuangTooltipComponent

The `QuangTooltipComponent` is a base overlay tooltip with its own style, used via the `[quangTooltip]` directive.

## Features

- Tooltip overlay for displaying additional information
- Configurable trigger and position (via directive)
- Supports animations for showing and hiding

## Inputs (via Directive)

- `quangTooltip`: `string` (required) — The content to display in the tooltip.
- `showMethod`: `'click' | 'hover'` — Specifies the trigger for the tooltip. Default: `'hover'`.
- `quangTooltipPosition`: `'top' | 'bottom' | 'left' | 'right'` — Position of the tooltip. Default: `'top'`.
- `payload`: `unknown` — Optional data to pass to the tooltip.

## Outputs

- *(none)* — The tooltip closes automatically when the user clicks outside or triggers the close logic.

## Usage

```html
<button
  [quangTooltip]="'This is a tooltip'"
  [showMethod]="'hover'"
  [quangTooltipPosition]="'top'"
>
  Hover me
</button>
```

## Notes

This component uses Angular animations for smooth transitions and extends the `QuangBaseOverlayComponent` for dynamic positioning. The tooltip is always used via the `[quangTooltip]` directive.
