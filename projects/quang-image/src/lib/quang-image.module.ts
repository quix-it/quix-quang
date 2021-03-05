import { NgModule } from '@angular/core'
import { PictureComponent } from './picture/picture.component'
import { QuixThreeSixtyImageComponent } from './quix-three-sixty-image/quix-three-sixty-image.component'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { CarouselComponent } from './carousel/carousel.component'
import { CarouselModule } from 'ngx-bootstrap/carousel'
import { VideoComponent } from './video/video.component'

@NgModule({
  declarations: [
    PictureComponent,
    QuixThreeSixtyImageComponent,
    CarouselComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    TranslocoModule,
    CarouselModule.forRoot()
  ],
  exports: [
    PictureComponent,
    QuixThreeSixtyImageComponent,
    CarouselComponent,
    VideoComponent
  ]
})
export class QuangImageModule {}
