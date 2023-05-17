import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { from } from 'rxjs'
import { Html5QrcodeResult } from 'html5-qrcode/core'

@Component({
  selector: 'quang-code-reader',
  templateUrl: './code-reader.component.html',
  styles: []
})
export class CodeReaderComponent implements OnInit {
  /**
   * component id
   */
  @Input() id: string = ''
  /**
   * component tabindex
   */
  @Input() tabIndex: number = 0
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
  /**
   * No device found error message
   */
  @Input() errorMessage: string = ''
  /**
   * Defines the autocomplete tag to indicate to the browser what type of field it is
   * and how to help the user fill it in
   */
  @Input() autocomplete: string = 'off'
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * supported formats
   */
  @Input() formats: Html5QrcodeSupportedFormats[] = []
  /**
   * Defines the size of the box in which the code will be identified
   */
  @Input() qrBox: { width: number, height: number } = { width: 250, height: 250 }
  /**
   * event emitter for co
   */
  @Output() whenFindCode: EventEmitter<Html5QrcodeResult> = new EventEmitter<Html5QrcodeResult>()
  /**
   * Devices list
   */
  _devices: Array<{ [key: string]: any }> = []
  /**
   * selected device
   */
  _cameraId: string = ''
  /**
   * the status of the error message
   */
  _errorMessage: boolean = false
  /**
   * html5 reader
   */
  _reader: Html5Qrcode | null = null

  ngOnInit (): void {
    this.getCameras()
  }

  /**
   * search for available cameras to start the reader
   */
  getCameras (): void {
    from(Html5Qrcode.getCameras()).subscribe(
      d => {
        this._errorMessage = false
        this._devices = d
      },
      err => {
        console.log(err)
        this._errorMessage = true
      })
  }

  /**
   * Starts the reading of the code,
   * when it identifies a valid code it emits an event
   */
  startReader (): void {
    this._reader = new Html5Qrcode(
      'wrapper-reader',
      { formatsToSupport: this.formats, verbose: false }
    )
    this._reader.start(
      this._cameraId,
      {
        fps: 10,
        qrbox: this.qrBox
      },
      (decodedText: string, decodedResult: Html5QrcodeResult) => {
        this.whenFindCode.emit(decodedResult)
      },
      (e) => {
      })
      .catch((e) => {
        console.error(e)
      })
  }

  /**
   * stop reader
   */
  public stopReader (): void {
    if (this._reader) {
      from(this._reader.stop()).subscribe(
        (ignore) => {},
        (e) => console.error(e)
      )
    }
  }
}
