import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map } from 'rxjs/operators'
import { sendNotification } from './notification.action'

/**
 * Service decoratore
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Notification effetc
 */
export class NotificationEffect {
  /**
   * Notification wrapper
   * @private
   */
  private notification: any
  /**
   * the effect is triggered when the action sendNotification is dispatched,
   * it takes care of creating and displaying the notification
   */
  sendNotification$ = createEffect(
    () => this.actions$.pipe(
      ofType(sendNotification),
      map((action) => {
        this.notification = new Notification(
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
