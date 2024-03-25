import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

/**
 * component decorator
 */
@Component({
  selector: 'quang-audio',
  templateUrl: './audio.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component for managing audio files
 */
export class QuangAudioComponent {
  /**
   * defines whether controls should be visible
   */
  @Input() controls: boolean = true
  /**
   *  defines whether audio must be muted
   */
  @Input() muted: boolean = false
  /**
   * defines whether autoplay must trigger
   */
  @Input() autoplay: boolean = false
  /**
   * Audio source
   */
  @Input() src: string = ''
  /**
   * component id
   */
  @Input() id: string = ''
  /**
   * Audio type media file
   */
  @Input() type: 'audio/ogg' | 'audio/mpeg' | 'audio/wav' = 'audio/mpeg'
  /**
   * Audio start event
   */
  @Output() whenAudioStart: EventEmitter<any> = new EventEmitter<any>()
  /**
   * Audio finish event
   */
  @Output() whenAudioFinish: EventEmitter<any> = new EventEmitter<any>()
  /**
   * Audio pause event
   */
  @Output() whenAudioPause: EventEmitter<any> = new EventEmitter<any>()
}
