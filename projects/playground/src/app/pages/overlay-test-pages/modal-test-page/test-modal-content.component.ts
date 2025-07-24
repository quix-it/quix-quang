import { Component, signal } from '@angular/core'

@Component({
  selector: 'playground-test-modal-content',
  template: `
    <div class="p-3">
      <h4>Dynamic Modal Content</h4>
      <p>This content was loaded dynamically using the QuangModalService!</p>
      <p>Counter: {{ counter() }}</p>
      <button
        (click)="increment()"
        class="btn btn-primary me-2"
      >
        Increment
      </button>
      <button
        (click)="decrement()"
        class="btn btn-secondary"
      >
        Decrement
      </button>
    </div>
  `,
  standalone: true,
})
export class TestModalContentComponent {
  counter = signal(0)

  increment(): void {
    this.counter.update((count) => count + 1)
  }

  decrement(): void {
    this.counter.update((count) => count - 1)
  }
}
