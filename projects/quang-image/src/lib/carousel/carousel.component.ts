import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { QuixCarousel } from './carousel.model'
/**
 * carousel component decorator
 */
@Component({
  selector: 'quix-carousel',
  templateUrl: './carousel.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * carousel component
 */
export class CarouselComponent {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * the height of the carousel
   */
  @Input() height: string = '50vh'
  /**
   * indicates if you want to display the title of the slides
   */
  @Input() title: boolean = false
  /**
   * indicates if you want to display the sub-title of the slides
   */
  @Input() subTitle: boolean = false
  /**
   * indicates if you want to view the slides in circular mode, that is,
   * after viewing the last one, you will resume viewing from the first one
   */
  @Input() noLoop: boolean = true
  /**
   * defines the time interval between one slide and another
   */
  @Input() interval: number = 2000
  /**
   * defines what side indicators of the slides are to be displayed
   */
  @Input() showIndicators: boolean = false
  /**
   * defines if you want to remove the possibility of activating the pause between slides
   */
  @Input() noPause: boolean = true
  /**
   * the list of slides
   */
  @Input() slides: QuixCarousel[] = []
  /**
   * event triggered when a slide changes
   */
  @Output() onSlideChange: EventEmitter<number> = new EventEmitter<number>()

  onSlideEvent (e: number): void {
    this.onSlideChange.emit(e)
  }
}
