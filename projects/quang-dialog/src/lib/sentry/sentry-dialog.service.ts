import { ErrorHandler, Injectable } from '@angular/core'
import * as Sentry from '@sentry/angular'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for sentry error handler wrapper
 */
export class SentryDialogService implements ErrorHandler {
  /**
   * Custom error handler for sentry
   * @param error http error
   */
  handleError (error: any) {
    console.error(error)
    if (/Loading chunk [\d]+ failed/.test(error.message)) {
      window.location.reload();
    }
    if (error?.name === 'HttpErrorResponse') {
      if (error?.status === 400 || error?.status === 404 || error?.status === 415) {
        Sentry.showReportDialog({})
      }
    } else {
      Sentry.showReportDialog({})
    }
  }
}
