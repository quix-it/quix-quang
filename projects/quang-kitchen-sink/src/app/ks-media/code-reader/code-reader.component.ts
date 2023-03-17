import { Component, OnInit } from '@angular/core'
import { Html5QrcodeResult } from 'html5-qrcode/core'
import { Html5QrcodeSupportedFormats } from 'html5-qrcode'

@Component({
  selector: 'ks-code-reader',
  templateUrl: './code-reader.component.html',
  styles: []
})
export class CodeReaderComponent {
  result: any = ''
  barCodeFormat = [
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8
  ]

  qrCodeFormat = [Html5QrcodeSupportedFormats.QR_CODE]

  logCode(code: Html5QrcodeResult): void {
    this.result = code
  }
}
