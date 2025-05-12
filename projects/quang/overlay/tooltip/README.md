# QuangTooltipComponent

The `QuangTooltipComponent` is a base overlay tooltip with its own style.

## Features
- Tooltip overlay for displaying additional information
- Configurable trigger and position
- Supports animations for showing and hiding

## Inputs
- `content`: The content to display in the tooltip. (Required)
- `position`: Specifies the position of the tooltip. Accepts values like `'top'`, `'bottom'`, `'left'`, `'right'`.
- `trigger`: Specifies the trigger for the tooltip. Accepts values like `'hover'`, `'click'`, `'focus'`.

## Outputs
- `onShow`: Emits an event when the tooltip is shown.
- `onHide`: Emits an event when the tooltip is hidden.

## Usage
```html
<button [quangTooltip]="'This is a tooltip'" [position]="'top'" [trigger]="'hover'">Hover me</button>
```

## Notes
This component uses Angular animations for smooth transitions and extends the `QuangBaseOverlayComponent` for dynamic positioning.
