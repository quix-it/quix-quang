import { OverlayModule } from '@angular/cdk/overlay'
import { DatePipe, NgClass, NgIf } from '@angular/common'
import { Component, effect, inject, signal } from '@angular/core'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangToastService } from './toast.service'

@Component({
  selector: 'quang-toast',
  standalone: true,
  imports: [OverlayModule, NgClass, TranslocoPipe, DatePipe, NgIf],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class QuangToastComponent {
  toastService = signal(inject(QuangToastService))
  readonly _showToast = this.toastService().showToast

  _showToastEffect = effect(() => {
    if (this._showToast()) {
      setTimeout(() => {
        this.toastService().closeToast()
      }, this.toastService().currentToast()?.timing)
    }
  })

  readonly _currentToast = this.toastService().currentToast

  close(): void {
    this.toastService().closeToast()
  }
}
