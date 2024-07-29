import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangBaseComponent } from '@quix/quang/components/shared'

export type LabelPosition = 'top' | 'left' | 'right' | 'bottom'

@Component({
  selector: 'quang-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangCheckboxComponent),
      multi: true,
    },
  ],
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuangCheckboxComponent extends QuangBaseComponent<boolean> {
  labelPosition = input<LabelPosition>('top')

  checkType = input.required<'checkbox' | 'toggle'>()

  override onChangedEventHandler($event: Event) {
    const inputElement = $event.target as HTMLInputElement
    this.onChangedHandler(inputElement.checked)
  }
}
