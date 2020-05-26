import {Injectable} from '@angular/core';
import {QuixModalService} from "../modal/quix-modal.service";
import {QuixHttpErrorModalComponent} from "./quix-http-error-modal/quix-http-error-modal.component";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuixHttpErrorService {
  modalError: any;

  constructor(
    private quixModalService: QuixModalService
  ) {
  }

  openErrorModal(error: HttpErrorResponse) {
    this.modalError = QuixHttpErrorModalComponent
    this.quixModalService.openModal(
      this.modalError,
      'httpErrorModal.' + error?.status + '.title',
      'md',
      {error: error},
      true,
      false)
  }
}
