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
/**
 * Toast component that can be displayed by calling the `QuangToastService.openToast()` method,
 * passing an object of config {@link ToastData}.
 *
 * @usageNotes
 * The {@link ToastData.customTemplate} property is used to display the custom template inside the toast.
 *
 * The toast header can be hidden by setting the {@link ToastData.hideHeader} boolean to `true`.
 *
 * If the toast header is visible, setting the {@link ToastData.type} property will change the background color
 * of a squared indicator positioned next to the header's title.
 *
 * The component can also display a {@link ToastData.customIcon} in the toast header instead of the squared indicator.
 */
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
