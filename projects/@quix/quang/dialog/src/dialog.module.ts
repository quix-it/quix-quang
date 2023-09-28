import { ModuleWithProviders, NgModule } from '@angular/core'
import { QuangModalService } from './modal/modal.service'
import { StoreModule } from '@ngrx/store'
import { quangDialogReducers } from './dialog.reducer'
import { QuangToastComponent } from './toast/toast.component'
import { QuangToastService } from './toast/toast.service'
import { CommonModule } from '@angular/common'
import { TranslocoModule } from '@ngneat/transloco'
import { ModalModule } from 'ngx-bootstrap/modal'
import { QuangLoaderComponent } from './loader/loader/loader.component'
import { QuangHttpErrorModalComponent } from './http-error/modal/http-error-modal.component'
import { QuangHttpErrorService } from './http-error/error.service'
import { QuangDialogConfig } from './dialog.config'
import { QUANGDIALOG_KEY } from './dialog.selectors'
import { QuangSkeletonComponent } from './skeleton/skeleton.component'
import { EffectsModule } from '@ngrx/effects'
import { QuangNotificationEffects } from './notification/store/effects/notification.effects'
import { QuangNotificationService } from './notification/notification.service'

@NgModule({
  declarations: [
    QuangToastComponent,
    QuangLoaderComponent,
    QuangHttpErrorModalComponent,
    QuangSkeletonComponent
  ],
  imports: [
    StoreModule.forFeature(QUANGDIALOG_KEY, quangDialogReducers),
    EffectsModule.forFeature([QuangNotificationEffects]),
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
    QuangLoaderComponent,
    QuangHttpErrorModalComponent,
    QuangSkeletonComponent
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
