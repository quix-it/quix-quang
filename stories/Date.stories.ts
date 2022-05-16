import { Meta, Story } from '@storybook/angular/types-6-0'
import { BlankComponent } from './blank.component'
import { InputDateComponent } from '../projects/quang-date/src/lib/input-date/input-date.component'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { InputDateRangeComponent } from '../projects/quang-date/src/lib/input-date-range/input-date-range.component'
import { InputDateTimeComponent } from '../projects/quang-date/src/lib/input-date-time/input-date-time.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { InputTimeComponent } from 'projects/quang-date/src/public-api'
import { BsTimepickerViewComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-timepicker-view.component'

export default {
  title: 'Date',
  component: BlankComponent,
  subcomponents: {
    InputDateComponent,
    InputDateRangeComponent,
    InputDateTimeComponent,
    // InputTimeComponent
  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [
      BlankComponent,
      InputDateComponent,
      InputDateRangeComponent,
      InputDateTimeComponent,
      // InputTimeComponent,
      // BsTimepickerViewComponent
    ],
    imports: [
      TranslocoModule,
      ReactiveFormsModule,
      FormsModule,
      BsDatepickerModule.forRoot(),
      TimepickerModule.forRoot(),
      BrowserAnimationsModule
    ],
    providers: [
      { provide: TRANSLOCO_SCOPE, useValue: 'date' },
    ],
  })]
} as Meta

const Date: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    date: new FormControl('', Validators.required)
  })
  return {
    component: BlankComponent,
    template:
      `
      <section class="container-fluid">
        <div class="row mb-3">
          <div class="col">
            <div class="card">
              <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <h3>Quang input date</h3>
                    </div>
                    <div class="col-6 text-end">
                        <a cardAction href="https://rd.quix.it/quang/components/InputDateComponent.html">Configurazioni</a>
                    </div>
                </div>
              </div>
              <div class="card-body">
                  <form [formGroup]="group">
                    <quang-input-date
                      [label]="label"
                      [placeholder]="placeholder"
                      [errorMessage]="errorMessage"
                      [successMessage]="successMessage"
                      [helpMessage]="helpMessage"
                      [autocomplete]="'off'"
                      [tabIndex]="1"
                      [id]="'date id'"
                      [autofocus]="true"
                      [dateFormat]="dateFormat"
                      [formName]="'form'"
                      [buttonClass]="['btn', 'btn-outline-secondary']"
                      formControlName="date"
                    ><svg calendarIcon class="svg-inline--fa fa-calendar-alt fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>
                    </quang-input-date>
                  </form>
                  <dl>
                    <dt>Value:</dt>
                    <dd>{{group.controls.date.value}}</dd>
                  </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
      `,
    props: {
      ...args,
      group: group,
      errorMessage: boolean('errorMessage', true),
      successMessage: boolean('successMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'date label'),
      placeholder: text('placeholder', 'date placeholder'),
      dateFormat: text('dateFormat', 'YYYY-MM-DD')
    }
  }
}
const DateRange: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    dateRange: new FormControl('', Validators.required)
  })
  return {
    component: BlankComponent,
    template:
      `
      <section class="container-fluid">
        <div class="row mb-3">
          <div class="col">
            <div class="card">
              <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <h3>Quang input date range</h3>
                    </div>
                    <div class="col-6 text-end">
                        <a cardAction href="https://rd.quix.it/quang/components/InputDateComponent.html">Configurazioni</a>
                    </div>
                </div>
              </div>
              <div class="card-body">
                  <form [formGroup]="group">
                    <quang-input-date-range
                      [label]="'form.date-range.label'"
                      [placeholder]="placeholder"
                      [errorMessage]="errorMessage"
                      [successMessage]="successMessage"
                      [helpMessage]="helpMessage"
                      [autocomplete]="'off'"
                      [tabIndex]="1"
                      [id]="'date-range id'"
                      [autofocus]="true"
                      [dateFormat]="dateFormat"
                      [formName]="'form'"
                      [buttonClass]="['btn', 'btn-outline-secondary']"
                      formControlName="dateRange"
                    ><svg calendarIcon class="svg-inline--fa fa-calendar-alt fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>
                    </quang-input-date-range>
                  </form>
                  <dl>
                    <dt>Value:</dt>
                    <dd>{{group.controls.dateRange.value}}</dd>
                  </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
      `,
    props: {
      ...args,
      group: group,
      errorMessage: boolean('errorMessage', true),
      successMessage: boolean('successMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'date-range label'),
      placeholder: text('placeholder', 'date placeholder'),
      dateFormat: text('dateFormat', 'YYYY-MM-DD')
    }
  }
}
const DateTime: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    datetime: new FormControl('', Validators.required)
  })
  return {
    component: BlankComponent,
    template:
      `
      <section class="container-fluid">
        <div class="row mb-3">
          <div class="col">
            <div class="card">
              <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <h3>Quang input date time</h3>
                    </div>
                    <div class="col-6 text-end">
                        <a cardAction href="https://rd.quix.it/quang/components/InputDateComponent.html">Configurazioni</a>
                    </div>
                </div>
              </div>
              <div class="card-body">
                  <form [formGroup]="group">
                    <quang-input-date-time
                      [label]="label"
                      [placeholder]="placeholder"
                      hoursPlaceholder="00"
                      minutesPlaceholder="00"
                      secondsPlaceholder="00"
                      [errorMessage]="errorMessage"
                      [successMessage]="successMessage"
                      [helpMessage]="helpMessage"
                      [autocomplete]="'off'"
                      [tabIndex]="1"
                      [id]="'date-time id'"
                      [autofocus]="true"
                      [dateFormat]="'YYYY-MM-DD'"
                      [formName]="'form'"
                      [buttonClass]="['btn', 'btn-outline-secondary']"
                      formControlName="datetime"
                    ><svg calendarIcon class="svg-inline--fa fa-calendar-alt fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>
                    </quang-input-date-time>
                  </form>
                  <dl>
                    <dt>Value:</dt>
                    <dd>{{group.controls.datetime.value}}</dd>
                  </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
      `,
    props: {
      ...args,
      group: group,
      errorMessage: boolean('errorMessage', true),
      successMessage: boolean('successMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'date-time label'),
      placeholder: text('placeholder', 'date-time placeholder'),
      dateFormat: text('dateFormat', 'YYYY-MM-DD')
    }
  }
}
const Time: Story<BlankComponent> = (args: BlankComponent) => {
  const group = new FormGroup({
    time: new FormControl(null, Validators.required)
  })
  return {
    component: BlankComponent,
    template:
      `
      <section class="container-fluid">
        <div class="row mb-3">
          <div class="col">
            <div class="card">
              <div class="card-header">
                <div class="row">
                    <div class="col-6">
                        <h3>Quang input time</h3>
                    </div>
                    <div class="col-6 text-end">
                        <a cardAction href="https://rd.quix.it/quang/components/InputDateComponent.html">Configurazioni</a>
                    </div>
                </div>
              </div>
              <div class="card-body">
                  <form [formGroup]="group">
                    <quang-input-time
                      [label]="label"
                      hoursPlaceholder="00"
                      minutesPlaceholder="00"
                      secondsPlaceholder="00"
                      [errorMessage]="errorMessage"
                      [successMessage]="successMessage"
                      [helpMessage]="helpMessage"
                      [tabIndex]="1"
                      [id]="'date id'"
                      [formName]="'form'"
                      formControlName="time"
                    ></quang-input-time>
                  </form>
                  <dl>
                    <dt>Value:</dt>
                    <dd>{{group.controls.time.value}}</dd>
                  </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
      `,
    props: {
      ...args,
      group: group,
      errorMessage: boolean('errorMessage', true),
      successMessage: boolean('successMessage', true),
      helpMessage: boolean('helpMessage', true),
      label: text('label', 'time label'),
    }
  }
}

export const InputDate = Date.bind({})
export const InputDateRange = DateRange.bind({})
export const InputDateTime = DateTime.bind({})
export const InputTime = Time.bind({})
