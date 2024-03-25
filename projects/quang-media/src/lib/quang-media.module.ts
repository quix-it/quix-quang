import { NgModule } from '@angular/core'
import { PictureComponent } from './picture/picture.component'
import { ThreeSixtyImageComponent } from './three-sixty-image/three-sixty-image.component'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { VideoComponent } from './video/video.component'
import { AudioComponent } from './audio/audio.component'
import { CodeReaderComponent } from './code-reader/code-reader.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    PictureComponent,
    ThreeSixtyImageComponent,
    VideoComponent,
    AudioComponent,
    CodeReaderComponent
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    TranslocoModule,
    FormsModule
  ],
  exports: [
    PictureComponent,
    ThreeSixtyImageComponent,
    VideoComponent,
    AudioComponent,
    CodeReaderComponent
  ]
})
export class QuangMediaModule {}
