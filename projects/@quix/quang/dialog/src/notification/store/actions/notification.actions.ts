import { createAction, props } from '@ngrx/store'

import { QuangNotification } from '../../notification.model'

/**
 * open toast
 */
export const sendNotification = createAction(
  '[NOTIFICATION API] send notification',
  props<{ notificationData: QuangNotification }>()
)
