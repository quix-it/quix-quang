import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangBaseComponent } from '@quang/components/shared'

export type LabelPosition = 'top' | 'left' | 'right' | 'bottom'

@Component({
  selector: 'quang-checkbox',
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
/**
 * Checkbox component for rendering a `checkbox` or a `toggle` switch.
 *
 * @usageNotes
 * This component can be configured to display as a standard checkbox or as a toggle switch,
 * depending on the `checkType` input property.
 *
 * The component label can be aligned in {@link LabelPosition} by setting the `labelPosition` input property.
 */
export class QuangCheckboxComponent extends QuangBaseComponent<boolean> {
  labelPosition = input<LabelPosition>('top')

  checkType = input.required<'checkbox' | 'toggle'>()

  removeMargin = input<boolean>(false)

  override onChangedEventHandler($event: Event) {
    const inputElement = $event.target as HTMLInputElement
    this.onChangedHandler(inputElement.checked)
  }
}
