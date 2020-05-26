import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-quix-http-error-modal',
  templateUrl: './quix-http-error-modal.component.html',
  styleUrls: ['./quix-http-error-modal.component.scss']
})
export class QuixHttpErrorModalComponent {
  @Input() error: HttpErrorResponse
  @Input() title: string
  constructor(public modalRef: BsModalRef) {
  }

  closeModal() {
    this.modalRef.hide();
  }

}
