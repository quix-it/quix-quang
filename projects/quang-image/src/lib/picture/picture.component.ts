import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core'
import { QuixPicture } from './picture.model'
/**
 * picture component decorator
 */
@Component({
  selector: 'quang-picture',
  templateUrl: './picture.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * picture component
 */
export class PictureComponent {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * The alt tag of the image
   */
  @Input() alt: string = ''
  /**
   * The list of images for the responsive view of the source,
   * always insert the sorted list from the smallest to the largest view
   */
  @Input() responsiveList: QuixPicture[] = []
  /**
   * The default image source
   */
  @Input() src: string = ''
  /**
   * the image displayed by default while the browser is loading the real image
   */
  @Input() loadingSrc: string = 'assets/images/lazy/default-placeholder.png'
  /**
   * arialael for the image
   */
  @Input() ariaLabel: string = ''

  /**
   * observe list changes and initialize src
   * @param changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.responsiveList?.currentValue) {
      this.src = changes.responsiveList?.currentValue[0].src
    }
  }
}
