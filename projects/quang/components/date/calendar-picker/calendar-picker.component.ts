import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  effect,
  output,
  viewChild
} from '@angular/core'

@Component({
  selector: 'quang-calendar-picker',
  standalone: true,
  imports: [],
  templateUrl: './calendar-picker.component.html',
  styleUrl: './calendar-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CalendarPickerComponent {
  dateContainerChange = output<ElementRef>()

  _dateContainer = viewChild<ElementRef>('inputDateContainer')

  _dateContainerChangeEffect = effect(() => {
    const targetInputDateContainer = this._dateContainer()
    if (targetInputDateContainer) {
      this.dateContainerChange.emit(targetInputDateContainer)
    }
  })

  onChange?: (value: Date) => void
}
