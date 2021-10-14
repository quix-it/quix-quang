import { Component, OnInit } from '@angular/core'
import { ExampleComponent } from './example/example.component'
import { QuixModalService } from '../../quang-dialog-core/modal/quix-modal.service'
import { merge } from 'rxjs'

@Component({
  selector: 'ks-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent {
  modalExample: any = ExampleComponent
event: string[] = []
  constructor (
    private readonly modalService: QuixModalService
  ) { }

  openModal (): void {
    this.event = []
    merge(
      this.modalService.onShownEvent(),
      this.modalService.onShowEvent(),
      this.modalService.onHiddenEvent(),
      this.modalService.onHideEvent()
    ).subscribe(v => {
      this.event.push(v)
    })
    this.modalService.openModal(
      this.modalExample,
      'Modal title',
      'lg',
      { param: 'initial value' })
  }
}
