import { ChangeDetectionStrategy, Component } from '@angular/core'
/**
 * card simple component decorator
 */
@Component({
  selector: 'quang-simple-card',
  templateUrl: './simple-card.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with only body
 */
export class QuangSimpleCardComponent {}
