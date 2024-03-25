import { ChangeDetectionStrategy, Component } from '@angular/core'
/**
 * card component decorator
 */
@Component({
  selector: 'quix-card',
  templateUrl: './quix-card.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper
 */
export class QuixCardComponent {}
