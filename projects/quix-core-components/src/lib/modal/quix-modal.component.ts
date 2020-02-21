import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {Subscription} from 'rxjs';

@Component({
  selector: 'qx-modal',
  template: '<button type="button" class="btn" [ngClass]="buttonClass" [id]="id" (click)="openModal()">\n' +
    '  {{buttonText |translate}}\n' +
    '</button>',
  styleUrls: []
})
export class QuixModalComponent implements OnInit {
  @Input() buttonClass: 'btn-primary' | 'btn-secondary' | 'btn-success' | 'btn-danger' | 'btn-warning' | 'btn-info' | 'btn-light' | 'btn-dark' | 'btn-link';
  @Input() buttonText: string;
  @Input() id: string;
  @Input() modalParams: any;
  @Input() modalTitle: string;
  @Input() modalComponent: any;
  @Input() size: | 'lg' | 'md' | 'sm';
  @Input() closeWithKeyboard: boolean;
  @Input() ignoreCloseWithClick: boolean;
  @Output() onShowFunction = new EventEmitter<string>();
  @Output() onCloseFunction = new EventEmitter<string>();
  modalRef: BsModalRef;
  subscriptions: Subscription[] = [];
  config = {
    keyboard: null,
    ignoreBackdropClick: null,
    class: null,
    initialState: null
  };

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
    this.modalRef = new BsModalRef();
  }

  openModal() {
    this.config = {
      keyboard: this.closeWithKeyboard,
      ignoreBackdropClick: this.ignoreCloseWithClick,
      class: '',
      initialState: this.modalParams
    };
    this.setEvent();
    this.setSize();
    this.modalRef = this.modalService.show(this.modalComponent, this.config);
    this.modalRef.content.title = this.modalTitle;
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  setEvent() {
    if (this.onShowFunction) {
      this.subscriptions.push(
        this.modalService.onShow.subscribe((reason: string) => {
          this.onShowFunction.emit(reason);
        })
      );
    }
    if (this.onCloseFunction) {
      this.subscriptions.push(
        this.modalService.onHide.subscribe((reason: string) => {
          this.onCloseFunction.emit(reason);
        })
      );
    }
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        this.unsubscribe();
      })
    );
  }

  setSize() {
    switch (this.size) {
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
