import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, effect, forwardRef, signal, viewChild } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'
import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker'

import { QuangBaseComponent } from '../quang-base-component.directive'
import { CalendarPickerComponent } from './calendar-picker/calendar-picker.component'

@Component({
  selector: 'quang-date',
  standalone: true,
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangDateComponent),
      multi: true
    }
  ],
  imports: [TranslocoPipe, NgIf, NgClass, CalendarPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangDateComponent extends QuangBaseComponent {
  _inputForDate = viewChild<ElementRef>('inputForDate')
  _dateContainer = signal<ElementRef | undefined>(undefined)
  _airDatepickerOptions = signal<AirDatepickerOptions>({})

  generateAirDatepickerEffect = effect(() => {
    if (this._inputForDate()?.nativeElement && this._dateContainer()?.nativeElement) {
      new AirDatepicker(this._inputForDate()?.nativeElement, {
        ...this._airDatepickerOptions(),
        container: this._dateContainer()?.nativeElement,
        onSelect: ({ date, formattedDate, datepicker }) => {}
      })
    }
  })
}
