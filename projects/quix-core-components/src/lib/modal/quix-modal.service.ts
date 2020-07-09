import {Component, Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

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
  };
  modalRef: BsModalRef;
  subscriptions: Subscription[] = [];
  public modalEvent: Subject<string>

  constructor(private modalService: BsModalService) {
  }

  openModal(modalComponent: Component,
            modalTitle: string,
            size: 'lg' | 'md' | 'sm',
            modalParams?: any,
            closeWithKeyboard?: boolean,
            ignoreCloseWithClick?: boolean,
  ) {
    this.modalRef = new BsModalRef();
    this.config = {
      ...this.config,
      keyboard: closeWithKeyboard,
      ignoreBackdropClick: ignoreCloseWithClick,
      class: '',
      initialState: modalParams,
    };
    this.setEvent();
    this.setSize(size);
    this.modalRef = this.modalService.show(modalComponent, this.config);
    this.modalRef.content.title = modalTitle;
  }

  setEvent() {
    this.subscriptions.push(
      this.modalService.onShown.subscribe(
        (reason: string) => {
          if (reason) {
            this.modalEvent.next(reason);
          }
        })
    );
    this.subscriptions.push(
      this.modalService.onShow.subscribe(
        (reason: string) => {
          if (reason) {
            this.modalEvent.next(reason);
          }
        })
    );
    this.subscriptions.push(
      this.modalService.onHide.subscribe(
        (reason: string) => {
          if (reason) {
            this.modalEvent.next(reason);
          }
        })
    );
    this.subscriptions.push(
      this.modalService.onHidden.subscribe(
        (reason: string) => {
          if (reason) {
            this.modalEvent.next(reason);
          }
          this.unsubscribe();
        })
    );
  }

  getModalEvent() {
    this.modalEvent = new Subject<string>();
    return this.modalEvent
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
    this.modalEvent?.complete()
  }

  setSize(size) {
    switch (size) {
      case 'lg':
        this.config.class = 'modal-lg';
        break;
      case 'sm':
        this.config.class = 'modal-sm';
        break;
      default:
        this.config.class = 'modal-md';
        break;
    }
  }
}
