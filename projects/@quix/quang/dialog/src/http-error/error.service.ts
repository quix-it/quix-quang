import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { QuangModalService } from '../modal/modal.service'

import { QuangHttpErrorModalComponent } from './modal/http-error-modal.component'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for http error management
 */
export class QuangHttpErrorService {
  /**
   * modal container
   */
  modalError: any
  /**
   * define if modal is open
   */
  isOpen: boolean = false

  /**
   * constructor
   * @param quangModalService modal utility
   */
  constructor(private readonly quangModalService: QuangModalService) {}

  /**
   * opens the generic error mode
   * opens only one error modal at a time and ignores the others
   * @param error
   */
  openErrorModal(error: HttpErrorResponse): void {
    this.quangModalService.onHideEvent().subscribe((e) => {
      switch (e) {
        case 'backdrop-click':
          this.isOpen = false
          break
        case 'close':
          this.isOpen = false
          break
        default:
          this.isOpen = false
          break
      }
    })
    if (!this.isOpen) {
      this.modalError = QuangHttpErrorModalComponent
      this.quangModalService.openModal(
        this.modalError,
        `httpErrorModal.${error?.status}.title`,
        'md',
        { error },
        true,
        false
      )
      this.isOpen = true
    }
  }
}
