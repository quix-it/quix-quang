import {Injectable} from '@angular/core';
import {Observable, Observer, Subject, Subscription} from 'rxjs';
import {ToastsModel} from './toasts.model';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  toasts: any;

  constructor() {
    this.toasts = new Subject();
  }

  openToasts(toast: ToastsModel) {
    this.toasts.next(toast);
  }

}
