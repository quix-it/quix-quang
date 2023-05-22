import { Component } from '@angular/core'
import { QuangToastService } from '../../../../../quang/dialog/src/lib/toast/toast.service'
import { QuangToast } from '../../../../../quang/dialog/src/lib/toast/toast.model'

@Component({
  selector: 'ks-toast',
  templateUrl: './toast.component.html',
  styles: []
})
export class ToastComponent {
  constructor(private readonly toastService: QuangToastService) {}

  openToast(): void {
    console.log('toast')
    this.toastService.openToast(
      new QuangToast(
        'success',
        'Toast title',
        'bottom-right',
        5000,
        'this is a toast',
        null,
        new Date(),
        'dd/MM/yyyy'
      )
    )
  }
}
