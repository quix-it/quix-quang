import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangBaseComponent } from '@quang/components/shared'

export type InputType = 'text' | 'textarea' | 'password' | 'email' | 'number' | 'url' | 'search' | 'tel' | 'color'

@Component({
  selector: 'quang-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangInputComponent),
      multi: true,
    },
  ],
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Input component that handles all the types declared in {@link InputType}
 * @property {boolean} resizable just for textarea {@link InputType}
 */
export class QuangInputComponent extends QuangBaseComponent<string | number> {
  componentType = input.required<InputType>()

  maxLengthText = input<number | null>(null)

  minLengthText = input<number | null>(null)

  minNumber = input<number | undefined>(undefined)

  maxNumber = input<number | undefined>(undefined)

  componentStep = input<number>(1)

  resizable = input(true)

  constructor() {
    super()
    toObservable(this.componentType)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.setupFormControl()
      })
  }
}
