import { Component } from '@angular/core'

import { merge } from 'rxjs'

import { QuangModalService } from '@quix/quang/dialog'

import { ExampleComponent } from './example/example.component'

@Component({
  selector: 'ks-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent {
  modalExample: any = ExampleComponent
  event: string[] = []
  constructor(private readonly modalService: QuangModalService) {}

  openModal(): void {
    this.event = []
    merge(
      this.modalService.onShownEvent(),
      this.modalService.onShowEvent(),
      this.modalService.onHiddenEvent(),
      this.modalService.onHideEvent()
    ).subscribe((v) => {
      this.event.push(v as string)
    })
    this.modalService.openModal(this.modalExample, 'Modal title', 'lg', {
      param: 'initial value'
    })
  }
}
