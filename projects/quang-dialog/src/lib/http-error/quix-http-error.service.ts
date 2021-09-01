import { Injectable } from '@angular/core'
import { QuixModalService } from '../modal/quix-modal.service'
import { QuixHttpErrorModalComponent } from './quix-http-error-modal/quix-http-error-modal.component'
import { HttpErrorResponse } from '@angular/common/http'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for http error management
 */
export class QuixHttpErrorService {
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
   * @param quixModalService modal utility
   */
  constructor (
    private readonly quixModalService: QuixModalService
  ) {
  }

  /**
   * opens the generic error mode
   * opens only one error modal at a time and ignores the others
   * @param error
   */
  openErrorModal (error: HttpErrorResponse): void {
    this.quixModalService.onHideEvent().subscribe(e => {
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
      this.modalError = QuixHttpErrorModalComponent
      this.quixModalService.openModal(
        this.modalError,
        `httpErrorModal.${error?.status}.title`,
        'md',
        { error: error },
        true,
        false)
      this.isOpen = true
    }
  }
}
