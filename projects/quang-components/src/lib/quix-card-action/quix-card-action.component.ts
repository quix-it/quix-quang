import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * card component decorator
 */
@Component({
  selector: 'quang-card-action',
  templateUrl: './quix-card-action.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with action
 */
export class QuixCardActionComponent {}
