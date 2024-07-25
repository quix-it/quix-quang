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
      multi: true
    }
  ],
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Checkbox component that can be of type checkbox or toggle
 * @property labelPosition - label can be aligned in {@link LabelPosition}
 */
export class QuangCheckboxComponent extends QuangBaseComponent<boolean> {
  labelPosition = input<LabelPosition>('top')
  checkType = input.required<'checkbox' | 'toggle'>()

  constructor() {
    super()
  }

  override onChangedEventHandler($event: Event) {
    const inputElement = $event.target as HTMLInputElement
    this.onChangedHandler(inputElement.checked)
  }
}
