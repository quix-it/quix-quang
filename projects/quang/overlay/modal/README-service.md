# QuangModalService

The `QuangModalService` is a service that allows you to programmatically create and manage modals in your Angular application. It provides a simple API to open, close, and manage multiple modals dynamically.

## Features

- **Dynamic Modal Creation**: Create modals programmatically by passing a component type
- **Multiple Modal Support**: Open multiple modals simultaneously with unique IDs
- **LIFO Management**: Last-in, first-out modal management (closing the most recent modal first)
- **Configurable Options**: Support for various modal configurations (position, size, animation, etc.)
- **ID-based Closure**: Close specific modals by their unique ID
- **Component Projection**: Pass any Angular component as modal content

## Usage

### Basic Example

```typescript
import { Component, inject } from '@angular/core'
import { QuangModalService } from 'quang/overlay/modal'

@Component({
  selector: 'app-example',
  template: `
    <button (click)="openModal()">Open Modal</button>
    <button (click)="closeModal()">Close Last Modal</button>
  `
})
export class ExampleComponent {
  private modalService = inject(QuangModalService)
  private lastModalId?: string

  openModal() {
    this.lastModalId = this.modalService.showModal(MyModalContentComponent, {
      position: 'center',
      width: '50vw',
      height: '60vh',
      animationMode: 'FADE'
    })
  }

  closeModal() {
    if (this.lastModalId) {
      this.modalService.hideModal(this.lastModalId)
    }
  }
}
```

### Modal Options

The `showModal` method accepts a `ModalOptions` interface with the following properties:

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

### Multiple Modals

The service supports opening multiple modals simultaneously:

```typescript
// Open multiple modals
const modal1 = this.modalService.showModal(ContentComponent1)
const modal2 = this.modalService.showModal(ContentComponent2)
const modal3 = this.modalService.showModal(ContentComponent3)

// Close the last opened modal (modal3)
this.modalService.hideModal()

// Close a specific modal
this.modalService.hideModal(modal1)
```

## API Reference

### Methods

#### `showModal<T>(component: Type<T>, options?: ModalOptions): string`

Opens a new modal with the specified component and options.

**Parameters:**
- `component`: The Angular component to display in the modal
- `options`: Optional configuration object for the modal

**Returns:**
- `string`: Unique ID of the created modal

#### `hideModal(id?: string): void`

Closes a modal. If no ID is provided, closes the last opened modal (LIFO behavior).

**Parameters:**
- `id`: Optional unique ID of the modal to close

### Modal Lifecycle

1. **Creation**: When `showModal` is called, a new modal instance is created with a unique ID
2. **Management**: Multiple modals are managed in a stack (LIFO)
3. **Closure**: Modals can be closed individually by ID or automatically (last opened)
4. **Cleanup**: Modal instances are properly destroyed and removed from the DOM

## Best Practices

1. **Store Modal IDs**: Keep track of modal IDs if you need to close specific modals
2. **Backdrop Clicks**: Enable backdrop clicking for better user experience
3. **Responsive Design**: Use relative units (vw, vh, %) for width and height
4. **Clean Closure**: Always close modals when components are destroyed
5. **Error Handling**: Handle cases where modal components might fail to load

## Examples

### Different Positions

```typescript
// Center modal (default)
this.modalService.showModal(ContentComponent, { position: 'center' })

// Left side modal
this.modalService.showModal(ContentComponent, { position: 'left' })

// Right side modal
this.modalService.showModal(ContentComponent, { position: 'right' })
```

### Animation Modes

```typescript
// Fade animation
this.modalService.showModal(ContentComponent, { animationMode: 'FADE' })

// Slide from bottom
this.modalService.showModal(ContentComponent, { animationMode: 'SLIDE_BOTTOM_TO_TOP' })
```

### Custom Sizing

```typescript
// Large modal
this.modalService.showModal(ContentComponent, {
  width: '80vw',
  height: '80vh'
})

// Compact modal
this.modalService.showModal(ContentComponent, {
  width: '400px',
  height: '300px'
})
```
