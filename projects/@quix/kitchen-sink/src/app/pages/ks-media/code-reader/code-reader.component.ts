import { Component } from '@angular/core'

import { Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { Html5QrcodeResult } from 'html5-qrcode/core'

@Component({
  selector: 'ks-code-reader',
  templateUrl: './code-reader.component.html',
  styles: []
})
export class CodeReaderComponent {
  resultQr: any = ''
  resultBar: any = ''
  barCodeFormat = [Html5QrcodeSupportedFormats.EAN_13, Html5QrcodeSupportedFormats.EAN_8]

  qrCodeFormat = [Html5QrcodeSupportedFormats.QR_CODE]

  logCode(code: Html5QrcodeResult): void {
    this.resultQr = code
  }

  logBarCode(code: Html5QrcodeResult): void {
    this.resultBar = code
  }
}
