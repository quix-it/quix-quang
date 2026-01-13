import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangRadioGroupComponent, RadioOption } from 'quang/components/radio-group'

@Component({
  selector: 'playground-radio-group-standard-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangRadioGroupComponent],
  template: `
    <quang-radio-group
      [formControl]="control"
      [radioOptions]="options()"
      componentLabel="Radio group"
    />

    <p class="mt-2 text-muted small">Selected value: {{ control.value ?? 'none' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupStandardExampleComponent {
  control = new FormControl<string | null>(null)

  options = signal<RadioOption[]>([
    { value: 'A', label: 'Option A' },
    { value: 'B', label: 'Option B' },
    { value: 'C', label: 'Option C (disabled)', disabled: true },
  ])
}

export const RADIO_GROUP_STANDARD_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangRadioGroupComponent, RadioOption } from 'quang/components/radio-group'

@Component({
  selector: 'app-radio-group-standard',
  imports: [ReactiveFormsModule, QuangRadioGroupComponent],
  template: \`
    <quang-radio-group
      componentLabel="Radio group"
      [formControl]="control"
      [radioOptions]="options()"
    />
  \`,
})
export class RadioGroupStandardComponent {
  control = new FormControl<string | null>(null)

  options = signal<RadioOption[]>([
    { value: 'A', label: 'Option A' },
    { value: 'B', label: 'Option B' },
    { value: 'C', label: 'Option C (disabled)', disabled: true },
  ])
}`

export const RADIO_GROUP_STANDARD_HTML = `<quang-radio-group
  componentLabel="Radio group"
  [formControl]="control"
  [radioOptions]="options()"
/>`
