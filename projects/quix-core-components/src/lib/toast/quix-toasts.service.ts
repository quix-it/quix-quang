import {Injectable} from '@angular/core';
import {ToastsModel} from './toasts.model';
import {Store} from '@ngrx/store';
import {ToastsState} from './toasts-store/toasts.reducer';
import {openToast} from './toasts-store/toasts.action';

@Injectable({
  providedIn: 'root'
})
export class QuixToastsService {

  constructor(private toastStore: Store<ToastsState>) {
  }

  openToasts(toast: ToastsModel) {
    this.toastStore.dispatch(openToast({toastData: toast}));
  }

}
