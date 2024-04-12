import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { QuangBaseComponent } from '../shared'

export interface SelectOption {
  label: string
  value: string | number
}

@Component({
  selector: 'quang-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends QuangBaseComponent<string | number | string[] | number[]> {
  // input array di SelectionOption
  // input mode "single", "multiple" con "single" come default
}
