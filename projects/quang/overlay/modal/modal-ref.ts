import { InjectionToken, inject } from '@angular/core'

import { QuangModalService } from './modal.service'

/**
 * Injection token for the modal ID
 */
export const MODAL_ID = new InjectionToken<string>('MODAL_ID')

/**
 * Helper class to manage modal closure from within the modal component
 */
export class ModalRef {
  private readonly modalService = inject(QuangModalService)
  private readonly modalId = inject(MODAL_ID)

  /**
   * Close the modal with optional data
   * @param data Optional data to pass when closing the modal (e.g., which button was clicked)
   */
  close(data?: object): void {
    this.modalService.close(this.modalId, data)
  }

  /**
   * Get the current modal ID
   */
  getId(): string {
    return this.modalId
  }
}
