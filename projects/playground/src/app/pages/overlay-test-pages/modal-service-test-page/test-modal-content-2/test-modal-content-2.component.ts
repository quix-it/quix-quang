import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'

import { QuangModalService } from 'quang/overlay/modal'

import { TestModalContentComponent } from '../test-modal-content/test-modal-content.component'

@Component({
  selector: 'playground-test-modal-content-2',
  templateUrl: './test-modal-content-2.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestModalContent2Component {
  private readonly modalService = inject(QuangModalService)

  onModalCreated = input<(modalId: string) => void>()

  // Use modal service signals
  modalCount = this.modalService.modalCount
  openModalIds = this.modalService.modalIds

  openAnotherModal(position: 'left' | 'right' | 'center' = 'center'): void {
    this.modalService.showModal(
      TestModalContentComponent,
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

    // The modal service now handles state automatically via signals
  }

  closeFirstModal(): void {
    this.modalService.hideModal(this.modalService.modalIds()[0])
  }
}
