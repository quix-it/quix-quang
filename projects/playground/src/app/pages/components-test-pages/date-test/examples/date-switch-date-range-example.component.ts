import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { SvgIconComponent } from 'angular-svg-icon'

import { DateRange, QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'playground-date-switch-date-range-example',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, QuangDateComponent, SvgIconComponent],
  template: `
    <div class="d-flex flex-wrap gap-3 align-items-center justify-content-between mb-2">
      <div class="d-flex align-items-center gap-2">
        <strong>Mode</strong>
        <div class="form-check form-switch mb-0">
          <input
            [checked]="isRange()"
            (change)="toggleMode()"
            class="form-check-input"
            id="dateModeSwitch"
            type="checkbox"
          />
          <label
            class="form-check-label"
            for="dateModeSwitch"
            >Range</label
          >
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <strong>Inline</strong>
        <div class="form-check form-switch mb-0">
          <input
            [checked]="showInline()"
            (change)="showInline.set(!showInline())"
            class="form-check-input"
            id="dateSwitchInlineSwitch"
            type="checkbox"
          />
          <label
            class="form-check-label"
            for="dateSwitchInlineSwitch"
            >Show inline</label
          >
        </div>
      </div>
    </div>

    @if (!isRange()) {
      <quang-date
        [formControl]="singleControl"
        [showInline]="showInline()"
        componentLabel="form.label.eventDate"
      >
        <svg-icon src="./assets/icons/svg/calendar.svg" />
      </quang-date>
    } @else {
      <quang-date
        [formControl]="rangeControl"
        [rangeSelection]="true"
        [showInline]="showInline()"
        componentLabel="form.label.eventDate"
      >
        <svg-icon src="./assets/icons/svg/calendar.svg" />
      </quang-date>
    }

    <p class="mt-2 text-muted small">Single: {{ singleControl.value ?? '—' }}</p>
    <p class="text-muted small">Range: {{ rangeControl.value | json }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSwitchDateRangeExampleComponent {
  isRange = signal(false)
  showInline = signal(false)

  singleControl = new FormControl<string | null>(new Date().toISOString(), {
    nonNullable: false,
    validators: [Validators.required],
  })
  rangeControl = new FormControl<DateRange | null>(null, {
    nonNullable: false,
    validators: [Validators.required],
  })

  // Handy for future expansion, keeps form structure explicit.
  form = new FormGroup({
    single: this.singleControl,
    range: this.rangeControl,
  })

  toggleMode(): void {
    this.isRange.set(!this.isRange())

    // When switching to range, seed a default range from the single date.
    if (this.isRange()) {
      const base = this.singleControl.value ?? new Date().toISOString()
      this.rangeControl.setValue({ dateFrom: base, dateTo: base })
    }
  }
}

export const DATE_SWITCH_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { DateRange, QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'app-date-switch',
  imports: [ReactiveFormsModule, QuangDateComponent],
  template: \`
    <button type="button" (click)="toggle()">Toggle</button>

    @if (!isRange()) {
      <quang-date componentLabel="form.label.eventDate" [formControl]="singleControl" />
    } @else {
      <quang-date
        [rangeSelection]="true"
        componentLabel="form.label.eventDate"
        [formControl]="rangeControl"
      />
    }
  \`,
})
export class DateSwitchComponent {
  isRange = signal(false)
  showInline = signal(false)

  singleControl = new FormControl<string | null>(new Date().toISOString(), [Validators.required])
  rangeControl = new FormControl<DateRange | null>(null, [Validators.required])

  toggleMode(): void {
    this.isRange.set(!this.isRange())
    if (this.isRange()) {
      const base = this.singleControl.value ?? new Date().toISOString()
      this.rangeControl.setValue({ dateFrom: base, dateTo: base })
    }
  }
}`

export const DATE_SWITCH_HTML = `@if (!isRange()) {
  <quang-date
    [showInline]="showInline()"
    componentLabel="form.label.eventDate"
    [formControl]="singleControl"
  />
} @else {
  <quang-date
    [rangeSelection]="true"
    [showInline]="showInline()"
    componentLabel="form.label.eventDate"
    [formControl]="rangeControl"
  />
}`
