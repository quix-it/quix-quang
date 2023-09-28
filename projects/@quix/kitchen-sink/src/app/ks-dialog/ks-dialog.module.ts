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
import { OfflineComponent } from './offline/offline.component'
import { HttpErrorComponent } from './http-error/http-error.component'
import { NotificationComponent } from './notification/notification.component'
import { ReactiveFormsModule } from '@angular/forms'
import { QuangCardsModule } from '../../../../quang/components/cards/src/lib/quang-cards.module'
import { QuangDialogModule } from '../../../../quang/dialog/src/lib/quang-dialog.module'

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
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'dialog' }
  ]
})
export class KsDialogModule {}
