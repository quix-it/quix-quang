import { Injectable } from '@angular/core'

import { Store } from '@ngrx/store'
import { Observable, from, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { QuangNotification } from './notification.model'

import { QuangNotificationActions } from './store/actions'

import { QuangDialogState } from '../dialog.reducer'

@Injectable({
  providedIn: 'root'
})
export class QuangNotificationService {
  constructor(private readonly store: Store<QuangDialogState>) {}

  requestPermission(): Observable<boolean> {
    if (this.checkNotification()) {
      return from(Notification.requestPermission()).pipe(switchMap((p) => of(p === 'granted')))
    }
    return of(false)
  }

  sendNotification(n: QuangNotification): void {
    this.store.dispatch(QuangNotificationActions.sendNotification({ notificationData: n }))
  }

  private checkNotification(): boolean {
    try {
      Notification.requestPermission().then()
    } catch (e) {
      return false
    }
    return true
  }
}
