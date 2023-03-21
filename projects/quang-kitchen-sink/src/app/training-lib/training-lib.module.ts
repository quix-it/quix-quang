import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TrainingLibRoutingModule } from './training-lib-routing.module'
import { CodeMirrorComponent } from './code-mirror/code-mirror.component'
import { SharedModule } from '../shared/shared.module'

import { CodemirrorModule } from '@ctrl/ngx-codemirror'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { ClipboardComponent } from './clipboard/clipboard.component'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ExcelComponent } from './excel/excel.component'
import { PdfComponent } from './pdf/pdf.component'
import { MaskComponent } from './mask/mask.component'
import { SwiperComponent } from './swiper/swiper.component'
import { DateFnsComponent } from './date-fns/date-fns.component'
import { SwiperModule } from 'swiper/angular'
import SwiperCore, { Pagination } from 'swiper'
import { PlatformComponent } from './platform/platform.component'
import { InfinityScrollComponent } from './infinity-scroll/infinity-scroll.component'
import { DragDropComponent } from './drag-drop/drag-drop.component'
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { CropperComponent } from './cropper/cropper.component'
import { ImageCropperModule } from 'ngx-image-cropper'
import { TranslocoComponent } from './transloco/transloco.component'
import { DataTableComponent } from './data-table/data-table.component'
import { MatSortModule } from '@angular/material/sort'

import { VconsoleComponent } from './vconsole/vconsole.component'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'
import { QuangDateModule } from '../../../../quang-date/src/lib/quang-date.module'
import { QuangCoreModule } from '../../../../quang-core/src/lib/quang-core.module'

SwiperCore.use([Pagination])

@NgModule({
  declarations: [
    CodeMirrorComponent,
    ClipboardComponent,
    ExcelComponent,
    PdfComponent,
    MaskComponent,
    SwiperComponent,
    DateFnsComponent,
    PlatformComponent,
    InfinityScrollComponent,
    DragDropComponent,
    VirtualScrollComponent,
    CropperComponent,
    TranslocoComponent,
    DataTableComponent,
    VconsoleComponent
  ],
  imports: [
    CommonModule,
    TrainingLibRoutingModule,
    SharedModule,
    QuangComponentsModule,
    CodemirrorModule,
    ReactiveFormsModule,
    TranslocoModule,
    ClipboardModule,
    // NgxMaskModule.forRoot(),
    ScrollingModule,
    InfiniteScrollModule,
    DragDropModule,
    ImageCropperModule,
    QuangDateModule,
    QuangCoreModule,
    FormsModule,
    SwiperModule,
    TranslocoModule,
    ImageCropperModule,
    MatSortModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'lib' }]
})
export class TrainingLibModule {}
