import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * card action component decorator
 */
@Component({
  selector: 'quang-card-action-header',
  templateUrl: './card-action-header.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with action and header
 */
export class QuangCardActionHeaderComponent {}
