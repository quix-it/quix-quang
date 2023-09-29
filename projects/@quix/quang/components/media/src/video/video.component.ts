import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

/**
 * video component decorator
 */
@Component({
  selector: 'quang-video',
  templateUrl: './video.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * video component
 */
export class QuangVideoComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * set the width of the video
   */
  @Input() width: string = '100%'
  /**
   * sets the height of the video
   */
  @Input() height: string = 'auto'
  /**
   * The arialabel that describes the component
   */
  @Input() ariaLabel: string = ''
  /**
   * The source of the video
   */
  @Input() src: SafeUrl | null = null
  /**
   * The video poster is the image displayed when the video has not started yet
   */
  @Input() poster: SafeUrl | null = null
  /**
   * Defines whether the video should start when the component is loaded
   */
  @Input() autoplay: boolean = false
  /**
   * Defines whether the video should show the control button bar
   */
  @Input() viewControl: boolean = false
  /**
   * Define whether the video should restart when finished
   */
  @Input() loop: boolean = false
  /**
   * Defines whether the video should be played without audio
   */
  @Input() mute: boolean = false
  /**
   * Defines the type of video played
   */
  @Input() type: 'video/mp4' | 'video/webm' | 'video/OGG' = 'video/mp4'
  /**
   * The html video element
   */
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement> | null = null
  /**
   * The current time of the video
   */
  _currentTime: number = 0

  /**
   * constructor
   * @param sanitizer
   */
  constructor(private readonly sanitizer: DomSanitizer) {}

  /**
   * When the source changes, sanitize the url and start the video,
   * When the poster changes sanitize the url and display the poster,
   * if the video at the change of url is not restarted, I force the restart
   * @param changes component changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src?.currentValue) {
      this.src = this.sanitizer.bypassSecurityTrustUrl(changes.src?.currentValue)
      if (this.video) {
        this.video.nativeElement.pause()
        this._currentTime = 0
        this.video.nativeElement.load()
      }
    }
    if (changes.baseImage?.currentValue) {
      this.poster = this.sanitizer.bypassSecurityTrustUrl(changes.baseImage?.currentValue)
    }
  }

  /**
   * Method to view the video in full screen
   */
  public toFullScreen(): void {
    if (this.video?.nativeElement?.requestFullscreen) {
      this.video?.nativeElement?.requestFullscreen()
    }
  }
}
