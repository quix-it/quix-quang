import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
import { from } from 'rxjs'

@Component({
  selector: 'quang-webcam',
  templateUrl: './webcam.component.html',
  styles: []
})
export class QuangWebcamComponent implements OnInit {
  /**
   *
   */
  @Input() id: string = ''
  /**
   *
   */
  @Input() photoHeight: number = 100
  /**
   *
   */
  @Input() photoWidth: number = 100
  /**
   *
   */
  @ViewChild('video', { static: true })
  video: ElementRef<HTMLVideoElement> | null = null
  /**
   *
   */
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> | null = null
  /**
   *
   */
  @Output() whenCameraReady: EventEmitter<boolean> = new EventEmitter<boolean>()
  /**
   *
   */
  @Output() whenVideoReady: EventEmitter<Blob | MediaSource> = new EventEmitter<Blob | MediaSource>()
  /**
   *
   */
  @Output() whenPhotoReady: EventEmitter<string> = new EventEmitter<string>()
  /**
   *
   */
  _stream: MediaStream | undefined = undefined
  /**
   *
   */
  _recorder: MediaRecorder | undefined = undefined
  /**
   *
   */
  _recordedChunks: any = []

  ngOnInit (): void {
    this.getDevice()
  }

  /**
   *
   */
  getDevice (): void {
    from(
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    ).subscribe((stream) => {
      if (this.video && this.video.nativeElement) {
        this.video.nativeElement.srcObject = stream
      }
      this._stream = stream
      this.whenCameraReady.emit(true)
    })
  }

  /**
   *
   */
  public startDevice (): void {
    this.video?.nativeElement.play()
  }

  /**
   *
   */
  public pauseDevice (): void {
    this.video?.nativeElement.pause()
  }

  /**
   *
   */
  takePhoto (): void {
    if (this.video?.nativeElement) {
      (this.canvas?.nativeElement as HTMLCanvasElement)
        ?.getContext('2d')
        ?.drawImage(
          this.video?.nativeElement,
          0,
          0,
          this.photoWidth,
          this.photoHeight
        )
      this.whenPhotoReady.emit(
        this.canvas?.nativeElement.toDataURL('image/png')
      )
    }
  }

  /**
   *
   */
  startRecordVideo (): void {
    if (this._stream) {
      this._recorder = new MediaRecorder(this._stream)
      this._recorder.ondataavailable = (e: BlobEvent) => {
        this.recorderOnDataAvailable(e)
      }
      this._recorder.start(100)
    }
  }

  /**
   *
   */
  recorderOnDataAvailable (event: any): void {
    this._recordedChunks.push(event.data)
  }

  /**
   *
   */
  stopRecordVideo (): void {
    this._recorder?.stop()
    this.whenVideoReady.emit(new Blob(this._recordedChunks))
    this._recordedChunks = []
  }
}
