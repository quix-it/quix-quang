import { OverlayModule } from '@angular/cdk/overlay'
import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'

import { TranslocoPipe } from '@jsverse/transloco'
import { map, of, switchAll, timer } from 'rxjs'

import { QuangToastService } from './toast.service'

@Component({
  selector: 'quang-toast',
  imports: [OverlayModule, NgClass, TranslocoPipe, DatePipe, NgTemplateOutlet],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
 *
 * @example
 * <quang-toast></quang-toast>
 * this.quangToast.openToast({
      type,
      title: type,
      position: 'bottom-center',
      text: 'custom text here',
      showCloseButton: true,
      timing: 50000000,
    })
 */
export class QuangToastComponent {
  toastService = signal(inject(QuangToastService))

  readonly isShowing = this.toastService().isShowing
  showAtLeastFor = input<number>(500)

  private showToastBuffer$ = toObservable(this.isShowing).pipe(
    map((isShowing) =>
      isShowing
        ? of(isShowing)
        : timer(this.toastService().currentToast()?.timing ?? this.showAtLeastFor()).pipe(map(() => isShowing))
    ),
    switchAll()
  )

  showToast = toSignal(this.showToastBuffer$)

  readonly _currentToast = this.toastService().currentToast

  close(): void {
    this.toastService().closeToast()
  }
}
