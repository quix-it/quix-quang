import { Component, Input } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { HttpErrorResponse } from '@angular/common/http'

/**
 * error modal component decorator
 */
@Component({
  selector: 'quang-http-error-modal',
  templateUrl: './quang-http-error-modal.component.html',
  styles: ['']
})
/**
 * error modal component
 */
export class QuangHttpErrorModalComponent {
  /**
   * http error
   */
  @Input() error: HttpErrorResponse | null = null
  /**
   * title of the error
   */
  @Input() title: string = ''

  /**
   * constructor
   * @param modalRef modal item
   * @param modalService modal utility
   */
  constructor (
    public readonly modalRef: BsModalRef,
    private readonly modalService: BsModalService
  ) {
  }

  /**
   * close modal error
   */
  closeModal (): void {
    this.modalService.onHide.emit('close')
    this.modalRef.hide()
  }
}
