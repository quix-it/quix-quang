# QuangTooltipComponent

The `QuangTooltipComponent` is a base overlay tooltip with its own style.

## Features

- Tooltip overlay for displaying additional information
- Configurable trigger and position
- Supports animations for showing and hiding

## Inputs

- `content`: The content to display in the tooltip. (Required)
- `overlayPosition`: Specifies the position of the tooltip. Accepts values like `'top'`, `'bottom'`, `'left'`, `'right'`.
- `showMethod`: Specifies the showMethod for the tooltip. Accepts values like `'hover'`, `'click'`, `'focus'`.

## Usage

```html
<button
  [quangTooltip]="'This is a tooltip'"
  [trigger]="'hover'"
>
  Hover me
</button>
```

## Notes

This component uses Angular animations for smooth transitions and extends the `QuangBaseOverlayComponent` for dynamic positioning.
