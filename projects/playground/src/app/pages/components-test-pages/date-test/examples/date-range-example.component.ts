import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { SvgIconComponent } from 'angular-svg-icon'

import { DateRange, QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'playground-date-range-example',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, QuangDateComponent, SvgIconComponent],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-2">
      <strong>Inline</strong>
      <div class="form-check form-switch">
        <input
          [checked]="showInline()"
          (change)="showInline.set(!showInline())"
          class="form-check-input"
          id="dateRangeInlineSwitch"
          type="checkbox"
        />
        <label
          class="form-check-label"
          for="dateRangeInlineSwitch"
          >Show inline</label
        >
      </div>
    </div>

    <quang-date
      [formControl]="control"
      [rangeSelection]="true"
      [showInline]="showInline()"
      componentLabel="form.label.dateRange"
    >
      <svg-icon src="./assets/icons/svg/calendar.svg" />
    </quang-date>

    <p class="mt-2 text-muted small">Value: {{ control.value | json }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeExampleComponent {
  showInline = signal(false)
  control = new FormControl<DateRange | null>(null)
}

export const DATE_RANGE_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { DateRange, QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'app-date-range',
  imports: [ReactiveFormsModule, QuangDateComponent],
  template: \`
    <quang-date
      [rangeSelection]="true"
      componentLabel="form.label.dateRange"
      [formControl]="control"
    />
  \`,
})
export class DateRangeComponent {
  showInline = signal(false)
  control = new FormControl<DateRange | null>(null)
}`

export const DATE_RANGE_HTML = `<quang-date
  [showInline]="showInline()"
  [rangeSelection]="true"
  componentLabel="form.label.dateRange"
  [formControl]="control"
/>`
