import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map } from 'rxjs/operators'
import { sendNotification } from './notification.action'

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
/**
 *
 */
export class NotificationEffect {
  /**
   *
   */
  sendNotification$ = createEffect(
    () => this.actions$.pipe(
      ofType(sendNotification),
      map((action) => {
        const n = new Notification(
          action.notificationData.title,
          {
            body: action.notificationData.body,
            icon: action.notificationData.iconUrl,
            image: action.notificationData.imageUrl
          }
        )
      })
    ),
    { dispatch: false }
  )

  /**
   * constructor
   * @param actions$
   */
  constructor (
    private readonly actions$: Actions
  ) {}
}
