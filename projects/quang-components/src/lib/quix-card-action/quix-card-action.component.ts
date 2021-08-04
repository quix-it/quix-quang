import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

/**
 * card component decorator
 */
@Component({
  selector: 'quix-card-action',
  templateUrl: './quix-card-action.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with action
 */
export class QuixCardActionComponent {}
