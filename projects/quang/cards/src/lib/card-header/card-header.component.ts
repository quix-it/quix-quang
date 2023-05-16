import { ChangeDetectionStrategy, Component } from '@angular/core'
/**
 * card header component decorator
 */
@Component({
  selector: 'quang-card-header',
  templateUrl: './card-header.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with header
 */
export class CardHeaderComponent {}
