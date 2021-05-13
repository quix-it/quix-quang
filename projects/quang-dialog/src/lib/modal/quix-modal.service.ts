import { Component, Injectable } from '@angular/core'
import { Observable, Subject, Subscription } from 'rxjs'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class QuixModalService {

  config = {
    keyboard: null,
    ignoreBackdropClick: null,
    class: null,
    initialState: null,
    animated: true
  }
  modalRef: BsModalRef

  constructor (private modalService: BsModalService) {
  }

  openModal (modalComponent: Component,
    modalTitle: string,
    size: 'xl' | 'lg' | 'md' | 'sm',
    modalParams?: any,
    closeWithKeyboard?: boolean,
    ignoreCloseWithClick?: boolean,
  ) {
    this.modalRef = new BsModalRef()
    this.config = {
      ...this.config,
      keyboard: closeWithKeyboard,
      ignoreBackdropClick: ignoreCloseWithClick,
      class: '',
      initialState: modalParams,
    }
    this.setSize(size)
    this.modalRef = this.modalService.show(modalComponent, this.config)
    this.modalRef.content.title = modalTitle
  }

  onShownEvent(): Observable<any>{
    return  this.modalService.onShown.pipe(take(1))
  }
  onShowEvent(): Observable<any>{
    return  this.modalService.onShow.pipe(take(1))
  }
  onHideEvent(): Observable<any>{
    return  this.modalService.onHide.pipe(take(1))
  }
  onHiddenEvent(): Observable<any>{
    return  this.modalService.onHidden.pipe(take(1))
  }

  setSize (size) {
    switch (size) {
      case 'xl':
        this.config.class = 'modal-xl'
        break
      case 'lg':
        this.config.class = 'modal-lg'
        break
      case 'sm':
        this.config.class = 'modal-sm'
        break
      default:
        this.config.class = 'modal-md'
        break
    }
  }
}
