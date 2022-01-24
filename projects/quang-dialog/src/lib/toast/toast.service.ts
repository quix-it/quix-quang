import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { QuangToast } from './toast.model'
import { ToastActions } from './toast-store/actions'
import { QuangDialogStateModule } from '../quang-dialog.reducers'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for toast management
 */
export class QuangToastService {
  /**
   * constructor
   * @param store store access
   */
  constructor (
    private readonly store: Store<QuangDialogStateModule>
  ) {
  }

  /**
   * opens the toast
   * @param toast
   */
  openToast (toast: QuangToast): void {
    this.store.dispatch(ToastActions.openToast({ toastData: toast }))
  }
}
