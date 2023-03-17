import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CodeMirrorComponent } from './code-mirror/code-mirror.component'
import { ClipboardComponent } from './clipboard/clipboard.component'
import { ExcelComponent } from './excel/excel.component'
import { PdfComponent } from './pdf/pdf.component'
import { MaskComponent } from './mask/mask.component'
import { SwiperComponent } from './swiper/swiper.component'
import { DateFnsComponent } from './date-fns/date-fns.component'
import { InfinityScrollComponent } from './infinity-scroll/infinity-scroll.component'
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component'
import { PlatformComponent } from './platform/platform.component'
import { DragDropComponent } from './drag-drop/drag-drop.component'
import { CropperComponent } from './cropper/cropper.component'
import { TranslocoComponent } from './transloco/transloco.component'
import { DataTableComponent } from './data-table/data-table.component'
import { VconsoleComponent } from './vconsole/vconsole.component'

const routes: Routes = [
  { path: 'codemirror', component: CodeMirrorComponent },
  { path: 'clipboard', component: ClipboardComponent },
  { path: 'excel', component: ExcelComponent },
  { path: 'pdf', component: PdfComponent },
  { path: 'mask', component: MaskComponent },
  { path: 'swiper', component: SwiperComponent },
  { path: 'date', component: DateFnsComponent },
  { path: 'infinite', component: InfinityScrollComponent },
  { path: 'virtual', component: VirtualScrollComponent },
  { path: 'platform', component: PlatformComponent },
  { path: 'cropper', component: CropperComponent },
  { path: 'transloco', component: TranslocoComponent },
  { path: 'datatable', component: DataTableComponent },
  { path: 'd&d', component: DragDropComponent },
  { path: 'vconsole', component: VconsoleComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingLibRoutingModule {}
