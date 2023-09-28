import { ModuleWithProviders, NgModule } from '@angular/core'
import { QuangModalService } from './modal/quang-modal.service'
import { StoreModule } from '@ngrx/store'
import { quangDialogReducers } from './quang-dialog.reducers'
import { QuangToastComponent } from './toast/toast.component'
import { QuangToastService } from './toast/toast.service'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { ModalModule } from 'ngx-bootstrap/modal'
import { LoaderComponent } from './loader/loader/loader.component'
import { QuangHttpErrorModalComponent } from './http-error/quang-http-error-modal/quang-http-error-modal.component'
import { QuangHttpErrorService } from './http-error/quang-http-error.service'
import { QuangDialogConfig } from './quang-dialog.config'
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
    StoreModule.forFeature(QUANGDIALOG_KEY, quangDialogReducers),
    EffectsModule.forFeature([NotificationEffects]),
    CommonModule,
    TranslocoModule,
    ModalModule.forRoot()
  ],
  providers: [
    QuangModalService,
    QuangToastService,
    QuangHttpErrorService,
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
