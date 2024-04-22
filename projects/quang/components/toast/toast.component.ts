import { OverlayModule } from '@angular/cdk/overlay'
import { DatePipe, NgClass } from '@angular/common'
import { Component, input } from '@angular/core'

import { TranslocoPipe } from '@ngneat/transloco'

@Component({
  selector: 'quang-toast',
  standalone: true,
  imports: [OverlayModule, NgClass, TranslocoPipe, DatePipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class QuangToastComponent {
  type = input.required<'success' | 'warning' | 'error'>()
  title = input<string>('')
  position = input<
    'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'top-center' | 'bottom-center'
  >('bottom-right')
  timing = input<number>()
  text = input<string>('')
  textValue = input<string>('')
  date = input<Date>()
  dateFormat = input<string>()

  close(): void {}
}
