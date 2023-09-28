import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Planet } from '../planet.model'

@Component({
  selector: 'ks-planets-list',
  templateUrl: './planets-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsListComponent {
  @Input() planets: Planet[] | null = []
}
