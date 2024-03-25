import { Component } from '@angular/core'

import { QuangToast, QuangToastService } from '@quix/quang/dialog'

@Component({
  selector: 'ks-toast',
  templateUrl: './toast.component.html',
  styles: []
})
export class ToastComponent {
  constructor(private readonly toastService: QuangToastService) {}

  openToast(): void {
    this.toastService.openToast(
      new QuangToast('success', 'Toast title', 'center', 5000, 'this is a toast', null, new Date(), 'dd/MM/yyyy')
    )
  }
}
