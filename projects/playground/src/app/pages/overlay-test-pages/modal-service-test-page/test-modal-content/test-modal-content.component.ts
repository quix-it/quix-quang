import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { ModalRef, QuangModalService } from 'quang/overlay/modal'

import { TestModalContent2Component } from '../test-modal-content-2/test-modal-content-2.component'

@Component({
  selector: 'playground-test-modal-content',
  imports: [TranslocoPipe],
  templateUrl: './test-modal-content.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestModalContentComponent {
  private readonly modalService = inject(QuangModalService)
  private readonly modalRef = inject(ModalRef)

  // Callback function to notify main page of new modals (still used for compatibility)
  onModalCreated = input<(modalId: string) => void>()

  counter = signal(0)

  // Use modal service signals instead of local state
  openModalIds = this.modalService.modalIds
  modalCount = this.modalService.modalCount

  increment(): void {
    this.counter.update((count) => count + 1)
  }

  decrement(): void {
    this.counter.update((count) => count - 1)
  }

  openAnotherModal(position: 'left' | 'right' | 'center' = 'center'): void {
    this.modalService
      .showModal(
        TestModalContent2Component,
        {
          position,
          height: '60vh',
          width: '45vw',
          animationMode: 'FADE',
          showBackdrop: true,
        },
        {
          onModalCreated: this.onModalCreated(),
        }
      )
      .subscribe({
        next: (result) => {
          console.log('Modal 2 chiusa con risultato:', result)
        },
      })
  }

  closeWithData(action: 'save' | 'cancel' | 'delete'): void {
    this.modalRef.close({
      action,
      counter: this.counter(),
      timestamp: new Date().toISOString(),
    })
  }
}
