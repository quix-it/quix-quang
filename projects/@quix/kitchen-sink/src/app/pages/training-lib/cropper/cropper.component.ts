import { Component } from '@angular/core'

import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper'

@Component({
  selector: 'ks-cropper',
  templateUrl: './cropper.component.html',
  styles: []
})
export class CropperComponent {
  imageChangedEvent: any = ''
  croppedImage: any = ''

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64
  }

  imageLoaded(image?: LoadedImage): void {
    // show cropper
  }

  cropperReady(): void {
    // cropper ready
  }

  loadImageFailed(): void {
    // show message
  }
}
