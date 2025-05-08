import { Component, TemplateRef, inject, viewChild } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangToastService } from 'quang/overlay/toast'

@Component({
  selector: 'playground-toast-test-page',
  imports: [TranslocoPipe],
  templateUrl: './toast-test-page.component.html',
  styleUrl: './toast-test-page.component.scss',
})
export class ToastTestPageComponent {
  private readonly quangToast = inject(QuangToastService)

  private readonly customToast = viewChild<TemplateRef<any>>('customToast')

  openToast(type: 'success' | 'warning' | 'error', customIcon?: boolean): void {
    this.quangToast.openToast({
      type,
      title: type,
      position: 'bottom-center',
      text: 'beauty button here',
      customTemplate: this.customToast(),
      showCloseButton: true,
      customIcon: customIcon ? './assets/icons/svg/calendar.svg' : '',
      timing: 5000,
    })
  }
}
