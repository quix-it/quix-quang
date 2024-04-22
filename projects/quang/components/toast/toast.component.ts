import { OverlayModule } from '@angular/cdk/overlay'
import { DatePipe, NgClass } from '@angular/common'
import { Component, inject, input, signal } from '@angular/core'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangToastService } from './toast.service'

@Component({
  selector: 'quang-toast',
  standalone: true,
  imports: [OverlayModule, NgClass, TranslocoPipe, DatePipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class QuangToastComponent {
  type = input<'success' | 'warning' | 'error'>()
  title = input<string>('')
  position = input<
    'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'top-center' | 'bottom-center'
  >('bottom-right')
  timing = input<number>()
  text = input<string>('')
  textValue = input<string>('')
  date = input<Date>()
  dateFormat = input<string>()

  toastService = signal(inject(QuangToastService))
  readonly _showToast = this.toastService().showToast

  close(): void {
    this.toastService().closeToast()
  }

  open(): void {
    if (this._showToast())
      setTimeout(() => {
        this.close()
      }, this.timing())
  }
}
