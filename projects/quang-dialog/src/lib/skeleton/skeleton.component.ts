import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

/**
 * component decorator
 */
@Component({
  selector: 'quang-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * quang skeleton
 */
export class SkeletonComponent {
  /**
   * Custom id for skeleton div
   */
  @Input() id: string = ''
  /**
   * Custom class for div skeleton
   */
  @Input() customClass: string[] = []
}
