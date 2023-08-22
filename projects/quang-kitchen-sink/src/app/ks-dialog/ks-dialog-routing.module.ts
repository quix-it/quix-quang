import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SkeletonComponent } from './skeleton/skeleton.component'
import { ToastComponent } from './toast/toast.component'
import { LoaderComponent } from './loader/loader.component'
import { ModalComponent } from './modal/modal.component'
import { OfflineComponent } from './offline/offline.component'
import { HttpErrorComponent } from './http-error/http-error.component'
import { NotificationComponent } from './notification/notification.component'

const routes: Routes = [
  { path: 'skeleton', component: SkeletonComponent },
  { path: 'loader', component: LoaderComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'toast', component: ToastComponent },
  { path: 'offline', component: OfflineComponent },
  { path: 'error', component: HttpErrorComponent },
  { path: 'notification', component: NotificationComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsDialogRoutingModule {}
