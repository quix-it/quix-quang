import { ChangeDetectionStrategy, Component } from '@angular/core'
/**
 * card header component decorator
 */
@Component({
  selector: 'quix-card-header',
  templateUrl: './quix-card-header.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with header
 */
export class QuixCardHeaderComponent {}
