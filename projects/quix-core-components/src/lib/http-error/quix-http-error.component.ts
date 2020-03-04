import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-quix-http-error',
  templateUrl: './quix-http-error.component.html',
  styleUrls: ['./quix-http-error.component.scss']
})
export class QuixHttpErrorComponent implements OnInit {
  status: number

  constructor(public modalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalRef.hide();
  }
}
