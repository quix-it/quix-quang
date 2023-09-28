import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core'

@Component({
  selector: 'ks-planets-form',
  templateUrl: './planets-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsFormComponent {
  @Output() whenGetPlanets: EventEmitter<null> = new EventEmitter<null>()
}
