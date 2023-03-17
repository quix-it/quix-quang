import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsDialogRoutingModule } from './ks-dialog-routing.module'
import { SkeletonComponent } from './skeleton/skeleton.component'
import { SharedModule } from '../shared/shared.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { ToastComponent } from './toast/toast.component'
import { LoaderComponent } from './loader/loader.component'
import { ModalComponent } from './modal/modal.component'
import { ExampleComponent } from './modal/example/example.component'
import { SnackbarComponent } from './snackbar/snackbar.component'
import { OfflineComponent } from './offline/offline.component'
import { HttpErrorComponent } from './http-error/http-error.component'
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component'
import { BottomSheetExampleComponent } from './bottom-sheet/bottom-sheet-example/bottom-sheet-example.component'
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'
import { NotificationComponent } from './notification/notification.component'
import { ReactiveFormsModule } from '@angular/forms'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'
import { QuangDialogModule } from '../../../../quang-dialog/src/lib/quang-dialog.module'

@NgModule({
  declarations: [
    SkeletonComponent,
    ToastComponent,
    LoaderComponent,
    ModalComponent,
    ExampleComponent,
    SnackbarComponent,
    OfflineComponent,
    HttpErrorComponent,
    BottomSheetComponent,
    BottomSheetExampleComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    KsDialogRoutingModule,
    SharedModule,
    QuangComponentsModule,
    QuangDialogModule,
    TranslocoModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'dialog' },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ]
})
export class KsDialogModule {}
