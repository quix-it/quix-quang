import { Component, Input, OnInit } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-quix-http-error-modal',
  templateUrl: './quix-http-error-modal.component.html',
  styles: ['']
})
export class QuixHttpErrorModalComponent {
  @Input() error: HttpErrorResponse
  @Input() title: string

  constructor (
    public modalRef: BsModalRef,
    private modalService: BsModalService
  ) {
  }

  closeModal () {
    this.modalService.onHide.emit('close')
    this.modalRef.hide()
  }

}
