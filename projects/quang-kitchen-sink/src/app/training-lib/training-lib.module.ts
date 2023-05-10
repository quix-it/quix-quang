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
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'

import { VconsoleComponent } from './vconsole/vconsole.component'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { MatTableModule } from '@angular/material/table'
import { InputNumberModule } from 'projects/quang-components/input-number/public-api'
import { InputDateModule } from 'projects/quang-components/input-date/public-api'
import { InputDateRangeModule } from 'projects/quang-components/input-date-range/public-api'

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
    QuangCardsModule,
    CodemirrorModule,
    ReactiveFormsModule,
    TranslocoModule,
    ClipboardModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ScrollingModule,
    InfiniteScrollModule,
    DragDropModule,
    ImageCropperModule,
    MatTableModule,
    FormsModule,
    SwiperModule,
    TranslocoModule,
    ImageCropperModule,
    MatSortModule,
    QuangCardsModule,
    InputNumberModule,
    InputDateModule,
    InputDateRangeModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'lib' }, provideNgxMask()]
})
export class TrainingLibModule {}
