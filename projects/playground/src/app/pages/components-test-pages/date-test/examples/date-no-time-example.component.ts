import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { SvgIconComponent } from 'angular-svg-icon'

import { QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'playground-date-no-time-example',
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
          id="dateNoTimeInlineSwitch"
          type="checkbox"
        />
        <label
          class="form-check-label"
          for="dateNoTimeInlineSwitch"
          >Show inline</label
        >
      </div>
    </div>

    <quang-date
      [formControl]="control"
      [showInline]="showInline()"
      componentLabel="form.label.date"
    >
      <svg-icon src="./assets/icons/svg/calendar.svg" />
    </quang-date>

    <p class="mt-2 text-muted small">Value: {{ control.value ?? '—' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateNoTimeExampleComponent {
  showInline = signal(true)
  control = new FormControl<string | null>(new Date().toISOString())
}

export const DATE_NO_TIME_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'app-date-no-time',
  imports: [ReactiveFormsModule, QuangDateComponent],
  template: \`
    <quang-date
      componentLabel="form.label.date"
      [formControl]="control"
    />
  \`,
})
export class DateNoTimeComponent {
  showInline = signal(false)
  control = new FormControl<string | null>(new Date().toISOString())
}`

export const DATE_NO_TIME_HTML = `<quang-date
  [showInline]="showInline()"
  componentLabel="form.label.date"
  [formControl]="control"
/>`
