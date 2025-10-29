# QuangModalService

The `QuangModalService` is a service that allows you to programmatically create and manage modals in your Angular application. It provides a simple API to open, close, and manage multiple modals dynamically with return data support.

## Features

- **Dynamic Modal Creation**: Create modals programmatically by passing a component type
- **Multiple Modal Support**: Open multiple modals simultaneously with unique IDs
- **Return Data**: Get data back from modals (e.g., which button was clicked)
- **Observable-based**: Subscribe to modal results using RxJS Observables
- **ModalRef Helper**: Injectable class for easy modal closure with data
- **LIFO Management**: Last-in, first-out modal management
- **Configurable Options**: Support for various modal configurations (position, size, animation, etc.)

## Usage

### Basic Example with Return Data

```typescript
import { Component, inject } from '@angular/core'
import { QuangModalService, ModalRef } from 'quang/overlay/modal'

// Modal Component
@Component({
  selector: 'app-confirm-modal',
  template: `
    <h2>Confirm Action</h2>
    <button (click)="onConfirm()">Yes</button>
    <button (click)="onCancel()">No</button>
  `
})
export class ConfirmModalComponent {
  private modalRef = inject(ModalRef)

  onConfirm() {
    this.modalRef.close({ action: 'confirm', confirmed: true })
  }

  onCancel() {
    this.modalRef.close({ action: 'cancel', confirmed: false })
  }
}

// Main Component
@Component({
  selector: 'app-example',
  template: `<button (click)="openModal()">Open Modal</button>`
})
export class ExampleComponent {
  private modalService = inject(QuangModalService)

  openModal() {
    this.modalService.showModal(ConfirmModalComponent, {
      position: 'center',
      width: '400px'
    }).subscribe(result => {
      if (result) {
        const { confirmed } = result as { confirmed: boolean }
        if (confirmed) this.performAction()
      }
    })
  }

  private performAction() { }
}
```

### Multiple Modals with Data

```typescript
this.modalService.showModal(FormComponent, options).subscribe(result => {
  if (result) {
    const { action, data } = result as { action: string; data: any }
    switch (action) {
      case 'save': this.save(data); break
      case 'cancel': console.log('Cancelled'); break
    }
  }
})
```

## API Reference

### QuangModalService

#### `showModal<T>(component: Type<T>, options?: ModalOptions, componentInputs?: Record<string, unknown>): Observable<object | undefined>`

Opens a modal and returns an Observable that emits when closed.

**Returns:** Observable that emits return data or `undefined` if closed without data.

#### `close(id: string, data?: object): void`

Closes a specific modal with optional return data.

#### `hideModal(id?: string): void`

Closes a modal (LIFO if no ID provided). Emits `undefined`.

### ModalRef

Injectable class for modal components.

#### `close(data?: object): void`

Closes the modal with optional return data.

#### `getId(): string`

Returns the modal's unique ID.

### Modal Options

```typescript
interface ModalOptions {
  position?: 'left' | 'right' | 'center'
  width?: string
  height?: string
  animationMode?: 'FADE' | 'SLIDE_BOTTOM_TO_TOP' | 'SLIDE_TOP_TO_BOTTOM' | 'SLIDE_LEFT_TO_RIGHT' | 'SLIDE_RIGHT_TO_LEFT'
  showBackdrop?: boolean
  padding?: string
}
```

## Best Practices

1. **Use ModalRef** in modal components for easy closure with data
2. **Subscribe to results** to handle return data
3. **Type your data** using interfaces for type safety
4. **Handle undefined** - modal can close without data (backdrop click)
5. **Use relative units** (vw, vh, %) for responsive design

## Examples

### Form Modal

```typescript
@Component({
  template: `
    <input [(ngModel)]="name" placeholder="Name" />
    <button (click)="save()">Save</button>
    <button (click)="cancel()">Cancel</button>
  `
})
export class FormModal {
  private modalRef = inject(ModalRef)
  name = ''
  
  save() {
    this.modalRef.close({ action: 'save', name: this.name })
  }
  
  cancel() {
    this.modalRef.close({ action: 'cancel' })
  }
}

// Usage
this.modalService.showModal(FormModal, { position: 'center' })
  .subscribe(result => {
    if (result && (result as any).action === 'save') {
      console.log('Saved:', (result as any).name)
    }
  })
```

### Type-Safe Returns

```typescript
interface ConfirmResult {
  confirmed: boolean
  action: 'yes' | 'no'
}

this.modalService.showModal(ConfirmComponent, options)
  .subscribe(result => {
    if (result) {
      const { confirmed, action } = result as ConfirmResult
      // TypeScript knows the structure
    }
  })
```

### Sequential Modals

```typescript
this.modalService.showModal(FirstModal, options)
  .subscribe(firstResult => {
    if (firstResult) {
      this.modalService.showModal(SecondModal, options, { data: firstResult })
        .subscribe(secondResult => {
          console.log({ firstResult, secondResult })
        })
    }
  })
```
