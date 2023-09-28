import { NgModule } from '@angular/core'
import { QuangPictureComponent } from './picture/picture.component'
import { QuangThreeSixtyImageComponent } from './three-sixty-image/three-sixty-image.component'
import { TranslocoModule } from '@ngneat/transloco'
import { QuangVideoComponent } from './video/video.component'
import { QuangAudioComponent } from './audio/audio.component'
import { QuangCodeReaderComponent } from './code-reader/code-reader.component'
import { FormsModule } from '@angular/forms'
import { QuangWebcamComponent } from './webcam/webcam.component'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    QuangAudioComponent,
    QuangCodeReaderComponent,
    QuangPictureComponent,
    QuangThreeSixtyImageComponent,
    QuangVideoComponent,
    QuangWebcamComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule
  ],
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
