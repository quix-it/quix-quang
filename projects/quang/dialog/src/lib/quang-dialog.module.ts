import { ModuleWithProviders, NgModule } from '@angular/core'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { QuangBottomSheetService } from './bottom-sheet/bottom-sheet.service'
import { QuangModalService } from './modal/quang-modal.service'
import { StoreModule } from '@ngrx/store'
import { quangDialogReducers } from './quang-dialog.reducers'
import { QuangSnackbarService } from './snackbar/quang-snackbar.service'
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar'
import { QuangToastComponent } from './toast/toast.component'
import { QuangToastService } from './toast/toast.service'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { ModalModule } from 'ngx-bootstrap/modal'
import { LoaderComponent } from './loader/loader/loader.component'
import { QuangHttpErrorModalComponent } from './http-error/quang-http-error-modal/quang-http-error-modal.component'
import { QuangHttpErrorService } from './http-error/quang-http-error.service'
import { QuangDialogConfig } from './quang-dialog.config'
import { SentryDialogService } from './sentry/sentry-dialog.service'
import { QUANGDIALOG_KEY } from './quang-dialog.selector'
import { SkeletonComponent } from './skeleton/skeleton.component'
import { EffectsModule } from '@ngrx/effects'
import { NotificationEffects } from './notification/notification-store/effects/notification.effects'
import { QuangNotificationService } from './notification/notification.service'

@NgModule({
  declarations: [
    QuangToastComponent,
    LoaderComponent,
    QuangHttpErrorModalComponent,
    SkeletonComponent
  ],
  imports: [
    MatBottomSheetModule,
    StoreModule.forFeature(QUANGDIALOG_KEY, quangDialogReducers),
    EffectsModule.forFeature([NotificationEffects]),
    MatSnackBarModule,
    CommonModule,
    TranslocoModule,
    ModalModule.forRoot()
  ],
  providers: [
    QuangBottomSheetService,
    QuangModalService,
    QuangSnackbarService,
    QuangToastService,
    QuangHttpErrorService,
    SentryDialogService,
    QuangNotificationService
  ],
  exports: [
    QuangToastComponent,
    LoaderComponent,
    QuangHttpErrorModalComponent,
    SkeletonComponent
  ]
})
export class QuangDialogModule {
  static forRoot (config?: QuangDialogConfig): ModuleWithProviders<QuangDialogModule> {
    return {
      ngModule: QuangDialogModule,
      providers: [
        { provide: QuangDialogConfig, useValue: config }
      ]
    }
  }
}
