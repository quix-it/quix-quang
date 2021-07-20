import { ModuleWithProviders, NgModule } from '@angular/core'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { QuixBottomSheetService } from './bottom-sheet/bottom-sheet.service'
import { QuixModalService } from './modal/quix-modal.service'
import { StoreModule } from '@ngrx/store'
import { quangDialogReducers, QUNAGDIALOG_KEY } from './quang-dialog.reducers'
import { QuixSnackbarService } from './snackbar/quix-snackbar.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { QuixToastComponent } from './toast/toast.component'
import { QuixToastService } from './toast/toast.service'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { ModalModule } from 'ngx-bootstrap/modal'
import { LoaderComponent } from './loader/loader/loader.component'
import { QuixHttpErrorModalComponent } from './http-error/quix-http-error-modal/quix-http-error-modal.component'
import { QuixHttpErrorService } from './http-error/quix-http-error.service'
import { QuangDialogConfig } from './quang-dialog.config'
import { SentryDialogService } from './sentry/sentry-dialog.service'

@NgModule({
  declarations: [
    QuixToastComponent,
    LoaderComponent,
    QuixHttpErrorModalComponent
  ],
  imports: [
    MatBottomSheetModule,
    StoreModule.forFeature(QUNAGDIALOG_KEY, quangDialogReducers),
    MatSnackBarModule,
    CommonModule,
    TranslocoModule,
    ModalModule.forRoot()
  ],
  providers: [
    QuixBottomSheetService,
    QuixModalService,
    QuixSnackbarService,
    QuixToastService,
    QuixHttpErrorService,
    SentryDialogService
  ],
  exports: [
    QuixToastComponent,
    LoaderComponent,
    QuixHttpErrorModalComponent
  ]
})
export class QuangDialogModule {
  static forRoot (config?: QuangDialogConfig): ModuleWithProviders<any> {
    return {
      ngModule: QuangDialogModule,
      providers: [
        { provide: QuangDialogConfig, useValue: config }
      ]
    }
  }
}
