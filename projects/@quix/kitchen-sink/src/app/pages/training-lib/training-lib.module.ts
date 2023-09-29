import { ClipboardModule } from '@angular/cdk/clipboard'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'

import { CodemirrorModule } from '@ctrl/ngx-codemirror'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { ImageCropperModule } from 'ngx-image-cropper'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import SwiperCore, { Pagination } from 'swiper'
import { SwiperModule } from 'swiper/angular'

import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangInputDateModule, QuangInputDateRangeModule, QuangInputNumberModule } from '@quix/quang/components/input'

import { SharedModule } from '../../shared/shared.module'
import { TrainingLibRoutingModule } from './training-lib-routing.module'

import { ClipboardComponent } from './clipboard/clipboard.component'
import { CodeMirrorComponent } from './code-mirror/code-mirror.component'
import { CropperComponent } from './cropper/cropper.component'
import { DataTableComponent } from './data-table/data-table.component'
import { DateFnsComponent } from './date-fns/date-fns.component'
import { DragDropComponent } from './drag-drop/drag-drop.component'
import { ExcelComponent } from './excel/excel.component'
import { InfinityScrollComponent } from './infinity-scroll/infinity-scroll.component'
import { MaskComponent } from './mask/mask.component'
import { PdfComponent } from './pdf/pdf.component'
import { PlatformComponent } from './platform/platform.component'
import { SwiperComponent } from './swiper/swiper.component'
import { TranslocoComponent } from './transloco/transloco.component'
import { VconsoleComponent } from './vconsole/vconsole.component'
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component'

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
    QuangCardsModule,
    QuangInputNumberModule,
    QuangInputDateModule,
    QuangInputDateRangeModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'lib' }, provideNgxMask()]
})
export class TrainingLibModule {}
