import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input } from '@angular/core'

import { QuangModalService } from '../../modal/modal.service'

/**
 * error modal component decorator
 */
@Component({
  selector: 'quang-http-error-modal',
  templateUrl: './http-error-modal.component.html',
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
   * @param modalService modal utility
   */
  constructor(private readonly modalService: QuangModalService) {}

  /**
   * close modal error
   */
  closeModal(): void {
    this.modalService.closeModal('close')
  }
}
