import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { SvgIconComponent } from 'angular-svg-icon'

import { QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'playground-date-full-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangDateComponent, SvgIconComponent],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-2">
      <strong>Inline</strong>
      <div class="form-check form-switch">
        <input
          [checked]="showInline()"
          (change)="showInline.set(!showInline())"
          class="form-check-input"
          id="dateFullInlineSwitch"
          type="checkbox"
        />
        <label
          class="form-check-label"
          for="dateFullInlineSwitch"
          >Show inline</label
        >
      </div>
    </div>

    <quang-date
      [formControl]="control"
      [showInline]="showInline()"
      [timepicker]="true"
      componentLabel="form.label.date"
    >
      <svg-icon src="./assets/icons/svg/calendar.svg" />
    </quang-date>

    <p class="mt-2 text-muted small">Value: {{ control.value ?? '—' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFullExampleComponent {
  showInline = signal(false)
  control = new FormControl<string | null>(new Date().toISOString())
}

export const DATE_FULL_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'app-date-full',
  imports: [ReactiveFormsModule, QuangDateComponent],
  template: \`
    <quang-date
      [timepicker]="true"
      componentLabel="form.label.date"
      [formControl]="control"
    />
  \`,
})
export class DateFullComponent {
  showInline = signal(false)
  control = new FormControl<string | null>(new Date().toISOString())
}`

export const DATE_FULL_HTML = `<quang-date
  [showInline]="showInline()"
  [timepicker]="true"
  componentLabel="form.label.date"
  [formControl]="control"
/>`
