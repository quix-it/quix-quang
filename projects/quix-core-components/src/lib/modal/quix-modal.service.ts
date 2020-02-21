import {Component, Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Subscription} from 'rxjs';

@Injectable()
export class QuixModalService {
  config = {
    keyboard: null,
    ignoreBackdropClick: null,
    class: null,
    initialState: null
  };
  modalRef: BsModalRef;
  subscriptions: Subscription[] = [];

  constructor(private modalService: BsModalService) {
  }

  openModal(modalComponent: Component,
            modalTitle: string,
            size: 'lg' | 'md' | 'sm',
            modalParams?: any,
            closeWithKeyboard?: boolean,
            ignoreCloseWithClick?: true,
            onShowFunction?: (reason) => {},
            onCloseFunction?: (reason) => {},
  ) {
    this.modalRef = new BsModalRef();
    this.config = {
      keyboard: closeWithKeyboard,
      ignoreBackdropClick: ignoreCloseWithClick,
      class: '',
      initialState: modalParams
    };
    this.setEvent(onShowFunction, onCloseFunction);
    this.setSize(size);
    this.modalRef = this.modalService.show(modalComponent, this.config);
    this.modalRef.content.title = modalTitle;
  }

  setEvent(onShowFunction, onCloseFunction) {
    if (onShowFunction) {
      this.subscriptions.push(
        this.modalService.onShow.subscribe((reason: string) => {
          onShowFunction(reason);
        })
      );
    }
    if (onCloseFunction) {
      this.subscriptions.push(
        this.modalService.onHide.subscribe((reason: string) => {
          onCloseFunction(reason);
        })
      );
    }
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        this.unsubscribe();
      })
    );
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
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
