import { Component, inject } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangToastService } from 'quang/overlay/toast'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

@Component({
  selector: 'playground-tooltip-test-page',
  imports: [QuangTooltipDirective, TranslocoPipe],
  templateUrl: './tooltip-test-page.component.html',
  styleUrl: './tooltip-test-page.component.scss',
})
export class TooltipTestPageComponent {
  private readonly quangToast = inject(QuangToastService)

  openToast(type: 'success' | 'warning' | 'error', customIcon?: boolean): void {
    this.quangToast.openToast({
      type,
      title: type,
      position: 'bottom-center',
      text: 'beauty button here',
      // customTemplate: this.customToast,
      showCloseButton: true,
      customIcon: customIcon ? './assets/icons/svg/calendar.svg' : '',
      timing: 5000,
    })
  }
}
