import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangDialogModule } from '@quix/quang/dialog'

import { SharedModule } from '../../shared/shared.module'
import { HttpErrorComponent } from './http-error/http-error.component'
import { KsDialogRoutingModule } from './ks-dialog-routing.module'
import { LoaderComponent } from './loader/loader.component'
import { ExampleComponent } from './modal/example/example.component'
import { ModalComponent } from './modal/modal.component'
import { NotificationComponent } from './notification/notification.component'
import { OfflineComponent } from './offline/offline.component'
import { SkeletonComponent } from './skeleton/skeleton.component'
import { ToastComponent } from './toast/toast.component'

@NgModule({
  declarations: [
    SkeletonComponent,
    ToastComponent,
    LoaderComponent,
    ModalComponent,
    ExampleComponent,
    OfflineComponent,
    HttpErrorComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    KsDialogRoutingModule,
    SharedModule,
    QuangCardsModule,
    QuangDialogModule,
    TranslocoModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'dialog' }]
})
export class KsDialogModule {}
