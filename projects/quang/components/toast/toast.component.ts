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
  toastService = signal(inject(QuangToastService))
  readonly _showToast = this.toastService().showToast
  readonly _currentToast = this.toastService().currentToast
  close(): void {
    this.toastService().closeToast()
  }
}
