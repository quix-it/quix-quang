import { Component, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangModalComponent } from 'quang/overlay/modal'

@Component({
  selector: 'playground-modal-test-page',
  imports: [QuangModalComponent, TranslocoPipe],
  templateUrl: './modal-test-page.component.html',
  styleUrl: './modal-test-page.component.scss',
})
export class ModalTestPageComponent {
  showModal = signal<boolean>(false)
  content = signal<string>('content')

  openModal(): void {
    this.showModal.set(true)
  }

  closeModal(): void {
    this.showModal.set(false)
  }

  btnAction(): void {
    this.content.update((content) => `${content}!!!`)
  }
}
