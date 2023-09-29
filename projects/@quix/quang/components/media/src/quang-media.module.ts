import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangAudioComponent } from './audio/audio.component'
import { QuangCodeReaderComponent } from './code-reader/code-reader.component'
import { QuangPictureComponent } from './picture/picture.component'
import { QuangThreeSixtyImageComponent } from './three-sixty-image/three-sixty-image.component'
import { QuangVideoComponent } from './video/video.component'
import { QuangWebcamComponent } from './webcam/webcam.component'

@NgModule({
  declarations: [
    QuangAudioComponent,
    QuangCodeReaderComponent,
    QuangPictureComponent,
    QuangThreeSixtyImageComponent,
    QuangVideoComponent,
    QuangWebcamComponent
  ],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [
    QuangPictureComponent,
    QuangThreeSixtyImageComponent,
    QuangVideoComponent,
    QuangCodeReaderComponent,
    QuangAudioComponent,
    QuangWebcamComponent
  ]
})
export class QuangMediaModule {}
