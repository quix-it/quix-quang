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

### HTML

```html
<quang-modal
  (backdropClick)="closeModal()"
  animationMode="SLIDE_BOTTOM_TO_TOP"
  height="80vh"
  padding="0"
  position="center"
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

This component uses Angular CDK's `Overlay` and `Portal` modules for rendering modals dynamically.
