import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { QuangDialogState } from '../quang-dialog.reducers'
import { QuixNotification } from './notification.model'
import { sendNotification } from './notification-store/notification.action'
import { from, Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class QuixNotificationService {
  constructor (
    private readonly store: Store<QuangDialogState>
  ) { }

  requestPermission (): Observable<boolean> {
    if (this.checkNotification()) {
      return from(Notification.requestPermission()).pipe(
        switchMap(p => of(p === 'granted'))
      )
    }
    return of(false)
  }

  sendNotification (n: QuixNotification): void {
    this.store.dispatch(sendNotification({ notificationData: n }))
  }

  private checkNotification (): boolean {
    try {
      Notification.requestPermission().then()
    } catch (e) {
      return false
    }
    return true
  }
}
