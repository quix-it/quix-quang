import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'

import { QuangBaseComponent } from '@quix/quang/components/shared'

export type LabelPosition = 'top' | 'left' | 'right' | 'bottom'

@Component({
  selector: 'quang-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangToggleComponent),
      multi: true
    }
  ],
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangToggleComponent extends QuangBaseComponent<boolean> {
  labelPosition = input<LabelPosition>('top')

  constructor() {
    super()
  }
}
