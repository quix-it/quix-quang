import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { SvgIconComponent } from 'angular-svg-icon'

import { QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'playground-date-time-only-example',
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
          id="timeOnlyInlineSwitch"
          type="checkbox"
        />
        <label
          class="form-check-label"
          for="timeOnlyInlineSwitch"
          >Show inline</label
        >
      </div>
    </div>

    <quang-date
      [formControl]="control"
      [showInline]="showInline()"
      [showOnlyTimepicker]="true"
      componentLabel="form.label.time"
    >
      <svg-icon src="./assets/icons/svg/calendar.svg" />
    </quang-date>

    <p class="mt-2 text-muted small">Value: {{ control.value ?? '—' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeOnlyExampleComponent {
  showInline = signal(true)
  // Initial ISO date is required so the component can keep the day while editing only time.
  control = new FormControl<string | null>(new Date().toISOString())
}

export const TIME_ONLY_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'app-time-only',
  imports: [ReactiveFormsModule, QuangDateComponent],
  template: \`
    <quang-date
      [showOnlyTimepicker]="true"
      componentLabel="form.label.time"
      [formControl]="control"
    />
  \`,
})
export class TimeOnlyComponent {
  showInline = signal(false)
  control = new FormControl<string | null>(new Date().toISOString())
}`

export const TIME_ONLY_HTML = `<quang-date
  [showInline]="showInline()"
  [showOnlyTimepicker]="true"
  componentLabel="form.label.time"
  [formControl]="control"
/>`
