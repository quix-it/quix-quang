import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { TranslocoModule } from '@ngneat/transloco'
import { StoreModule } from '@ngrx/store'
import { ModalModule } from 'ngx-bootstrap/modal'

import { QuangHttpErrorService } from './http-error/error.service'
import { QuangModalService } from './modal/modal.service'
import { QuangNotificationService } from './notification/notification.service'
import { QuangToastService } from './toast/toast.service'

import { QuangHttpErrorModalComponent } from './http-error/modal/http-error-modal.component'
import { QuangLoaderComponent } from './loader/loader/loader.component'
import { QuangSkeletonComponent } from './skeleton/skeleton.component'
import { QuangToastComponent } from './toast/toast.component'

import { QuangNotificationEffects } from './notification/store/effects/notification.effects'
import { EffectsModule } from '@ngrx/effects'

import { QUANGDIALOG_KEY } from './dialog.selectors'

import { QuangDialogConfig } from './dialog.config'
import { quangDialogReducers } from './dialog.reducer'

@NgModule({
  declarations: [QuangToastComponent, QuangLoaderComponent, QuangHttpErrorModalComponent, QuangSkeletonComponent],
  imports: [
    StoreModule.forFeature(QUANGDIALOG_KEY, quangDialogReducers),
    EffectsModule.forFeature([QuangNotificationEffects]),
    CommonModule,
    TranslocoModule,
    ModalModule.forRoot()
  ],
  providers: [QuangModalService, QuangToastService, QuangHttpErrorService, QuangNotificationService],
  exports: [QuangToastComponent, QuangLoaderComponent, QuangHttpErrorModalComponent, QuangSkeletonComponent]
})
export class QuangDialogModule {
  static forRoot(config?: QuangDialogConfig): ModuleWithProviders<QuangDialogModule> {
    return {
      ngModule: QuangDialogModule,
      providers: [{ provide: QuangDialogConfig, useValue: config }]
    }
  }
}
