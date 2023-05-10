import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * card component decorator
 */
@Component({
  selector: 'quang-card-action',
  templateUrl: './card-action.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with action
 */
export class CardActionComponent {}
