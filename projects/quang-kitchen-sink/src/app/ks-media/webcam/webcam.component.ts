import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core'
import { WebcamComponent as QuangWebcam } from '../../../../../quang/media/src/lib/webcam/webcam.component'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'ks-webcam',
  templateUrl: './webcam.component.html',
  styles: []
})
export class WebcamComponent {
  @ViewChild('quangWebcam', { static: true }) webcam: QuangWebcam | null = null
  @ViewChild('video', { static: true }) video:
  | ElementRef<HTMLVideoElement>
  | undefined = undefined

  ready: boolean = false
  photo: string | undefined = undefined
  videoFile: SafeResourceUrl = ''
  constructor (private readonly sanitizer: DomSanitizer) {}

  start (): void {
    this.webcam?.startDevice()
  }

  pause (): void {
    this.webcam?.pauseDevice()
  }

  checkWebcamStatus (s: boolean): void {
    this.ready = s
  }

  checkWebcamPhoto (s: string | undefined): void {
    this.photo = s
  }

  checkWebcamVideo (v: Blob | MediaSource): void {
    this.videoFile = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(v)
    )
  }

  takePhoto (): void {
    this.webcam?.takePhoto()
  }

  takeVideo (): void {
    this.webcam?.startRecordVideo()
    setTimeout(() => {
      this.webcam?.stopRecordVideo()
    }, 10000)
  }
}
