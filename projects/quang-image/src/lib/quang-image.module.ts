import { NgModule } from '@angular/core'
import { PictureComponent } from './picture/picture.component'
import { QuixThreeSixtyImageComponent } from './quix-three-sixty-image/quix-three-sixty-image.component'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { VideoComponent } from './video/video.component'

@NgModule({
  declarations: [
    PictureComponent,
    QuixThreeSixtyImageComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    TranslocoModule
  ],
  exports: [
    PictureComponent,
    QuixThreeSixtyImageComponent,
    VideoComponent
  ]
})
export class QuangImageModule {}
