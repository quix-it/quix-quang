import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { KsMediaRoutingModule } from './ks-media-routing.module'
import { PictureComponent } from './picture/picture.component'
import { VideoComponent } from './video/video.component'
import { ThreeSixtyComponent } from './three-sixty/three-sixty.component'
import { SharedModule } from '../shared/shared.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { CodeReaderComponent } from './code-reader/code-reader.component'
import { AudioComponent } from './audio/audio.component'
import { WebcamComponent } from './webcam/webcam.component'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { QuangMediaModule } from '../../../../quang-media/src/lib/quang-media.module'

@NgModule({
  declarations: [
    PictureComponent,
    VideoComponent,
    ThreeSixtyComponent,
    CodeReaderComponent,
    AudioComponent,
    WebcamComponent
  ],
  imports: [
    CommonModule,
    KsMediaRoutingModule,
    QuangCardsModule,
    SharedModule,
    QuangMediaModule,
    TranslocoModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'media'
    }
  ]
})
export class KsMediaModule {}
