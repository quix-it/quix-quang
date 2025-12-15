import { ComponentRef } from '@angular/core'

import { Subject } from 'rxjs'

import { QuangModalComponent } from '../modal.component'

export interface ModalInstance {
  id: string
  modalRef: ComponentRef<QuangModalComponent>
  contentRef: ComponentRef<unknown>
  closeSubject: Subject<object | undefined>
}
