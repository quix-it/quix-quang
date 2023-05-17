import { ChangeDetectionStrategy, Component } from '@angular/core'
/**
 * card simple component decorator
 */
@Component({
  selector: 'quang-card-simple',
  templateUrl: './card-simple.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with only body
 */
export class CardSimpleComponent {}
