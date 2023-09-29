import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangMediaModule } from '@quix/quang/components/media'

import { SharedModule } from '../../shared/shared.module'
import { KsMediaRoutingModule } from './ks-media-routing.module'

import { AudioComponent } from './audio/audio.component'
import { CodeReaderComponent } from './code-reader/code-reader.component'
import { PictureComponent } from './picture/picture.component'
import { ThreeSixtyComponent } from './three-sixty/three-sixty.component'
import { VideoComponent } from './video/video.component'
import { WebcamComponent } from './webcam/webcam.component'

@NgModule({
  declarations: [
    PictureComponent,
    VideoComponent,
    ThreeSixtyComponent,
    CodeReaderComponent,
    AudioComponent,
    WebcamComponent
  ],
  imports: [CommonModule, KsMediaRoutingModule, TranslocoModule, SharedModule, QuangCardsModule, QuangMediaModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'media'
    }
  ]
})
export class KsMediaModule {}
