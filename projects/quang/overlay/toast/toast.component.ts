import { OverlayModule } from '@angular/cdk/overlay'
import { DatePipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangToastService } from './toast.service'

@Component({
  selector: 'quang-toast',
  standalone: true,
  imports: [OverlayModule, NgClass, TranslocoPipe, DatePipe, NgIf, NgTemplateOutlet],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
