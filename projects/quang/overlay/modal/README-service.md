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
    const { id, closeCallback } = this.modalService.showModal(ConfirmModalComponent, {
      position: 'center',
      width: '400px'
    })
    
    // Subscribe to close events
    closeCallback.subscribe(result => {
      if (result) {
        const { confirmed } = result as { confirmed: boolean }
        if (confirmed) this.performAction()
      }
    })
    
    // Optionally store the modal ID for later reference
    console.log(`Modal opened with ID: ${id}`)
  }

  private performAction() { }
}
```

### Multiple Modals with Data

```typescript
const { id, closeCallback } = this.modalService.showModal(FormComponent, options)

closeCallback.subscribe(result => {
  if (result) {
    const { action, data } = result as { action: string; data: any }
    switch (action) {
      case 'save': this.save(data); break
      case 'cancel': console.log('Cancelled'); break
    }
  }
})

// You can use the ID to close the modal programmatically if needed
console.log(`Modal ID: ${id}`)
```

## API Reference

### QuangModalService

#### `showModal<T>(component: Type<T>, options: ModalOptions, componentInputs?: Record<string, unknown>): { id: string; closeCallback: Observable<object | undefined> }`

Opens a modal and returns an object containing the modal ID and a closeCallback Observable.

**Returns:** An object with:
- `id: string` — Unique identifier for the modal instance, useful for programmatic close operations
- `closeCallback: Observable<object | undefined>` — Observable that emits when the modal closes, with optional return data or `undefined` if closed without data

#### `close(id: string, data?: object): void`

Closes a specific modal with optional return data. The ID can be obtained from the `showModal` return value.

#### `hideModal(id?: string): void`

Closes a modal. If an ID is provided, closes that specific modal. If no ID is provided, closes the last modal (LIFO - Last In First Out). Emits `undefined` to closeCallback.

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
const { id, closeCallback } = this.modalService.showModal(FormModal, { position: 'center' })

closeCallback.subscribe(result => {
  if (result && (result as any).action === 'save') {
    console.log('Saved:', (result as any).name)
  }
})

// Store ID if you need to close it programmatically
console.log(`Form Modal ID: ${id}`)
```

### Type-Safe Returns

```typescript
interface ConfirmResult {
  confirmed: boolean
  action: 'yes' | 'no'
}

const { id, closeCallback } = this.modalService.showModal(ConfirmComponent, options)

closeCallback.subscribe(result => {
  if (result) {
    const { confirmed, action } = result as ConfirmResult
    // TypeScript knows the structure
  }
})
```

### Sequential Modals

```typescript
const { id: firstId, closeCallback: firstCallback } = this.modalService.showModal(FirstModal, options)

firstCallback.subscribe(firstResult => {
  if (firstResult) {
    const { id: secondId, closeCallback: secondCallback } = this.modalService.showModal(SecondModal, options, { data: firstResult })
    
    secondCallback.subscribe(secondResult => {
      console.log({ firstResult, secondResult })
    })
  }
})
```

### Programmatic Modal Close

```typescript
// Open modal and get its ID
const { id, closeCallback } = this.modalService.showModal(ConfirmComponent, options)

// Subscribe to results
closeCallback.subscribe(result => {
  console.log('Modal closed with result:', result)
})

// Close the modal programmatically after 5 seconds
setTimeout(() => {
  this.modalService.close(id, { action: 'timeout' })
}, 5000)
```
