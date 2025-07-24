import { Component, inject, input, signal } from '@angular/core'

import { QuangModalService } from 'quang/overlay/modal'

@Component({
  selector: 'playground-test-modal-content',
  template: `
    <div class="p-3">
      <h4>Dynamic Modal Content</h4>
      <p>This content was loaded dynamically using the QuangModalService!</p>
      <p>Counter: {{ counter() }}</p>

      <div class="mb-3">
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

      <hr />

      <div class="mb-2">
        <strong>Open Additional Modals:</strong>
      </div>
      <div class="d-flex gap-2 flex-wrap">
        <button
          (click)="openAnotherModal('center')"
          class="btn btn-outline-primary btn-sm"
        >
          + Center Modal
        </button>
        <button
          (click)="openAnotherModal('left')"
          class="btn btn-outline-primary btn-sm"
        >
          + Left Modal
        </button>
        <button
          (click)="openAnotherModal('right')"
          class="btn btn-outline-primary btn-sm"
        >
          + Right Modal
        </button>
      </div>

      @if (openModalIds().length > 0) {
        <div class="mt-2">
          <small class="text-muted"> Opened {{ openModalIds().length }} modal(s) from this modal </small>
        </div>
      }
    </div>
  `,
  standalone: true,
})
export class TestModalContentComponent {
  private readonly modalService = inject(QuangModalService)

  // Callback function to notify main page of new modals
  onModalCreated = input<(modalId: string) => void>()

  counter = signal(0)
  openModalIds = signal<string[]>([])

  increment(): void {
    this.counter.update((count) => count + 1)
  }

  decrement(): void {
    this.counter.update((count) => count - 1)
  }

  openAnotherModal(position: 'left' | 'right' | 'center' = 'center'): void {
    const modalId = this.modalService.showModal(
      TestModalContentComponent,
      {
        position,
        height: '60vh',
        width: '45vw',
        animationMode: 'FADE',
        showBackdrop: true,
      },
      {
        // Pass the same callback down to nested modals
        onModalCreated: this.onModalCreated(),
      }
    )

    this.openModalIds.update((ids) => [...ids, modalId])

    // Notify main page about the new modal
    const callback = this.onModalCreated()
    if (callback) {
      callback(modalId)
    }
  }
}
