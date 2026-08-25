# QuangModalComponent

The `QuangModalComponent` is an overlay component used directly in its parent component.

## Features

- Modal overlay for displaying content
- Configurable size and position
- Supports animations for opening and closing

## Inputs

- `position`: `'right' | 'left' | 'center'` (required) — Position of the modal.
- `height`: `string` — Height of the modal. Default: `'80vh'`.
- `width`: `string` — Width of the modal. Default: `'80vw'`.
- `padding`: `string` — Padding inside the modal. Default: `'0 1rem'`.
- `containerClass`: `string` — Custom CSS class for the modal container.
- `animationMode`: `'SLIDE_FROM_LEFT_TO_RIGHT' | 'SLIDE_FROM_RIGHT_TO_LEFT' | 'SLIDE_TOP_TO_BOTTOM' | 'SLIDE_BOTTOM_TO_TOP' | 'FADE'` — Animation mode for the modal.
- `backgroundColor`: `string` — Background color for the modal.
- `showBackdrop`: `boolean` — Whether to show the backdrop. Default: `true`.
- Use `ng-container` with `header`, `body`, and `footer` slots for custom content.

## Outputs

- `backdropClick`: Emits when the user clicks on the backdrop (outside the modal).

## Usage

### HTML

```html
<quang-modal
  (backdropClick)="closeModal()"
  animationMode="SLIDE_BOTTOM_TO_TOP"
  height="80vh"
  padding="0"
  position="center"
  [showBackdrop]="true"
>
  <ng-container header>
    <div class="d-flex justify-content-between mt-2">
      <h3>{{ 'title.header' | transloco }}</h3>
      <button
        (click)="closeModal()"
        class="btn btn-outline-secondary"
        type="button"
      >
        X
      </button>
    </div>
  </ng-container>
  <ng-container body>
    <h3>{{ content() }}</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </p>
    <img
      alt="test"
      src="https://picsum.photos/200/300"
    />
  </ng-container>
  <ng-container footer>
    <div class="d-flex mb-3 gap-3 w-100">
      <h3 class="d-flex flex-column flex-grow-1">{{ 'title.footer' | transloco }}</h3>
      <button
        (click)="closeModal()"
        class="btn btn-outline-secondary"
        type="button"
      >
        {{ 'buttons.close' | transloco }}
      </button>
    </div>
  </ng-container>
</quang-modal>
```

### TypeScript

```typescript
import { signal } from '@angular/core';

showModal = signal(false);
content = signal('Modal Content');

openModal() {
  showModal.set(true);
}

closeModal() {
  showModal.set(false);
}
```

## Notes

This component uses Angular CDK's `Overlay` and `Portal` modules for rendering modals dynamically. Refer to the component's API for all available configuration options.
