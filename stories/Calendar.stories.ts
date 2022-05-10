import { BlankComponent } from './blank.component'
import { CalendarComponent } from '../projects/quang-calendar/src/lib/calendar/calendar.component'
import { text, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { Meta, Story } from '@storybook/angular/types-6-0'
import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

export default {
  title: 'Calendar',
  component: BlankComponent,
  subcomponents: {
    CalendarComponent
  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [
      BlankComponent,
      CalendarComponent,
    ],
    imports: [
      TranslocoModule,
      CommonModule
    ],
    providers: [
      { provide: TRANSLOCO_SCOPE, useValue: 'calendar' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })]
} as Meta

const Calendar: Story<BlankComponent> = (args: BlankComponent) => {

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
                <h3>Quang calendar</h3>
            </div>
            <div class="col-6 text-end">
                <a cardAction href="https://rd.quix.it/quang/components/InputDateTimeComponent.html">Configurazioni</a>
            </div>
        </div>
        </div>
        <div class="card-body">
          <quang-calendar
            [height]="'600px'"
          ></quang-calendar>
        </div>
      </div>
    </div>
  </div>
</section>
      `,
    props: {
      ...args,
      height: text('height', '600px'),
    }
  }
}
export const QuangCalendar = Calendar.bind({})
