import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {QuixToast} from "./toast.model";
import {openToast} from "./toast-store/toast.action";

@Injectable({
  providedIn: 'root'
})
export class QuixToastService {

  constructor(
    private store: Store<any>
  ) {
  }

  openToast(toast: QuixToast) {
    this.store.dispatch(openToast({toastData: toast}))
  }
}
