import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {QuixToast} from "./toast.model";
import {openToast} from "./toast-store/toast.action";

@Injectable({
  providedIn: 'root'
})
/**
 * utility for toast management
 */
export class QuixToastService {
  /**
   * constructor
   * @param store store access
   */
  constructor(
    private readonly store: Store<any>
  ) {
  }

  /**
   * opens the toast
   * @param toast
   */
  openToast(toast: QuixToast) {
    this.store.dispatch(openToast({toastData: toast}))
  }
}
