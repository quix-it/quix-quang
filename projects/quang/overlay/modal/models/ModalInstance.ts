import { ComponentRef } from '@angular/core'

import { QuangModalComponent } from '../modal.component'

export interface ModalInstance {
  id: string
  modalRef: ComponentRef<QuangModalComponent>
  contentRef: ComponentRef<unknown>
}
