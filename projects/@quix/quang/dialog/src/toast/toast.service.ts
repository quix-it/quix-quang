import { Injectable } from '@angular/core'

import { Store } from '@ngrx/store'

import { QuangToast } from './toast.model'

import { QuangToastActions } from './store/actions'

import { QuangDialogStateModule } from '../dialog.reducer'

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
  constructor(private readonly store: Store<QuangDialogStateModule>) {}

  /**
   * opens the toast
   * @param toast
   */
  openToast(toast: QuangToast): void {
    this.store.dispatch(QuangToastActions.openToast({ toastData: toast }))
  }

  /**
   * lose the toast
   */
  closeToast(): void {
    this.store.dispatch(QuangToastActions.deleteToast())
  }
}
