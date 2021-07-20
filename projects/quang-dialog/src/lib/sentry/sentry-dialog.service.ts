import { ErrorHandler, Injectable } from '@angular/core'
import * as Sentry from '@sentry/angular'

@Injectable({
  providedIn: 'root'
})
export class SentryDialogService implements ErrorHandler {
  /**
   * Custom error handler for sentry
   * @param error
   */
  handleError (error: any) {
    console.error(error)
    if (error?.name === 'HttpErrorResponse') {
      if (error?.status === 400 || error?.status === 404 || error?.status === 415) {
        Sentry.showReportDialog({})
      }
    } else {
      Sentry.showReportDialog({})
    }
  }
}
