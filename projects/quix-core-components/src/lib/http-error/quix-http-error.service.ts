import {Injectable} from '@angular/core';

import {QuixHttpErrorComponent} from "./quix-http-error.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Injectable({
  providedIn: 'root'
})
export class QuixHttpErrorService {
  errorModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) {
  }

  openHttpErrorModal(status: number) {
    this.errorModalRef = new BsModalRef();
    const config = {
      keyboard: false,
      ignoreBackdropClick: false,
      class: '',
      initialState: {status: status}
    };
    this.errorModalRef = this.modalService.show(QuixHttpErrorComponent, config)
  }
}
