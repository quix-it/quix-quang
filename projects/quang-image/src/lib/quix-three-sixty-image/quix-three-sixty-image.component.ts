import {
  Component,
  ElementRef,
  Input, OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser'
import { of } from 'rxjs'
import { delay, tap } from 'rxjs/operators'

/**
 * three sixty component decorator
 */
@Component({
  selector: 'quang-three-sixty-image',
  templateUrl: './quix-three-sixty-image.component.html',
  styleUrls: ['./quix-three-sixty-image.component.scss']
})
/**
 * three sixty component
 */
export class QuixThreeSixtyImageComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * the height of the image
   */
  @Input() height: string = ''
  /**
   * the url of the default image before the final images are loaded
   */
  @Input() loadingSrc: string = 'url("assets/images/lazy/default-placeholder.png")'
  /**
   * The custom class to add to the component
   */
  @Input() customClass: string[] = []
  /**
   * the url list of the images to be displayed in sequence
   */
  @Input() images: string[] = []
  /**
   * enable the buttons that manage the rotation
   */
  @Input() clockwise: boolean = true
  /**
   * time between one image and another
   */
  @Input() timeRotation: number = 0
  /**
   * delay time before the start of the rotation
   */
  @Input() delayTime: number = 0

  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement> | null = null
  /**
   * rotation step
   */
  step: number = 30
  /**
   * current x vlaue
   */
  currentX: any
  /**
   * current eframe
   */
  currentFrame: number = 0
  /**
   * intervall timing wrapper
   */
  intervalId: any
  /**
   * mouse state
   */
  mouseStateDown = false
  /**
   * current image url
   */
  imageUrl: SafeStyle = ''
  /**
   * play status
   */
  play: boolean = true

  /**
   * constructor
   * @param sanitizer
   */
  constructor (
    private readonly sanitizer: DomSanitizer
  ) {
  }

  /**
   * If the url list changes, it waits for the delay time entered and starts the rotation
   * If the starting image changes, it sanitizes the url and sets it as the current image
   * @param changes component changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    if (changes.images?.currentValue) {
      of(changes.images?.currentValue).pipe(
        tap((list) => { this.images = list }),
        delay(this.delayTime)
      ).subscribe(list => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustStyle(`url("${this.images[0]}")`)
        this.autoRotator()
      })
    }
    if (changes.loadingSrc?.currentValue) {
      this.imageUrl = this.sanitizer.bypassSecurityTrustStyle(this.loadingSrc)
    }
  }

  /**
   * function triggered on the movement of the mouse,
   * controls the status of the rotation and the movement of the mouse to set the rotation to the right or left
   * @param event
   */
  mouseMove (event: any): void {
    if (this.mouseStateDown) {
      const screenX = (event.screenX) ? event.screenX : event.touches[0].screenX
      if (this.currentX - screenX >= this.step) {
        this.rotator('-')
        this.currentX = screenX
      } else if (this.currentX - screenX <= -this.step) {
        this.rotator('+')
        this.currentX = screenX
      }
    }
  }

  /**
   * Event triggered when the mouse button is pressed, saves the state of the mouse rotation
   * @param event
   */
  mouseDown (event: any): void {
    event.preventDefault()
    this.currentX = event.screenX
    if (this.play) {
      clearInterval(this.intervalId)
    }
    this.intervalId = null
    this.mouseStateDown = true
  }

  /**
   * Event triggered when the mouse button is release, saves the state of the mouse rotation
   * @param event
   */
  mouseUp (event: any): void {
    event.preventDefault()
    this.currentX = event.screenX
    if (this.play) {
      this.autoRotator()
    }
    this.mouseStateDown = false
  }

  /**
   * Check if the rotation is right or left and calculate which image should be displayed
   * @param act
   */
  rotator (act: string): void {
    if (this.clockwise) {
      if (act === '+') {
        this.currentFrame++
        this.currentFrame = (this.currentFrame > this.images.length - 1) ? 0 : this.currentFrame
      } else {
        this.currentFrame--
        this.currentFrame = (this.currentFrame <= 0) ? this.images.length - 1 : this.currentFrame
      }
    } else {
      if (act === '-') {
        this.currentFrame++
        this.currentFrame = (this.currentFrame > this.images.length - 1) ? 0 : this.currentFrame
      } else {
        this.currentFrame--
        this.currentFrame = (this.currentFrame <= 0) ? this.images.length - 1 : this.currentFrame
      }
    }
    this.imageUrl = this.sanitizer.bypassSecurityTrustStyle(`url("${this.images[this.currentFrame]}")`)
  }

  /**
   * Unleash automatic image rotation
   */
  autoRotator (): void {
    this.intervalId = setInterval(
      () => {
        this.rotator('+')
      }, this.timeRotation)
  }

  /**
   * change the state of the play button
   */
  togglePlay (): void {
    this.play = !this.play
    if (this.play) {
      this.autoRotator()
    } else {
      clearInterval(this.intervalId)
    }
  }

  /**
   * sanitize the url of the image
   * @param img
   */
  getUrl (img: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${img}")`)
  }
}
