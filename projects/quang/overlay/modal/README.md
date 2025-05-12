# QuangModalComponent

The `QuangModalComponent` is an overlay component used directly in its parent component.

## Features
- Modal overlay for displaying content
- Configurable size and position
- Supports animations for opening and closing

## Inputs
- `animationMode`: Specifies the animation mode for the modal. Accepts values like `'SLIDE_FROM_LEFT_TO_RIGHT'`, `'SLIDE_FROM_RIGHT_TO_LEFT'`, etc.
- `isOpen`: Controls whether the modal is open or closed. Default is `false`.

## Outputs
- `onClose`: Emits an event when the modal is closed.

## Usage
```html
<quang-modal
  [animationMode]="'SLIDE_FROM_LEFT_TO_RIGHT'"
  [isOpen]="true"
  (onClose)="handleModalClose()"
></quang-modal>
```

## Notes
This component uses Angular CDK's `Overlay` and `Portal` modules for rendering modals dynamically.
