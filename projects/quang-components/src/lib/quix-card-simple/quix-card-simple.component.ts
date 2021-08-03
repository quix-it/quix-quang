import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'quix-card-simple',
  templateUrl: './quix-card-simple.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * bootstrap card wrapper with only body
 */
export class QuixCardSimpleComponent {}
