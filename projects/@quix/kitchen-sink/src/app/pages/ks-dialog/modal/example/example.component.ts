import { Component, Input } from '@angular/core'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'ks-example',
  templateUrl: './example.component.html',
  styles: []
})
export class ExampleComponent {
  @Input() title: string = ''
  @Input() param: string = ''

  constructor(
    public readonly modalRef: BsModalRef,
    private readonly modalService: BsModalService
  ) {}

  close(): void {
    this.modalService.onHide.emit('close')
    this.modalRef.hide()
  }

  save(): void {
    this.modalService.onHide.emit('return value')
    this.modalRef.hide()
  }
}
