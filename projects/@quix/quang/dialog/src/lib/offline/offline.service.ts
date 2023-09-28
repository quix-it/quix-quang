import { Injectable } from '@angular/core'
import { fromEvent, merge, Observable, of } from 'rxjs'
import { mapTo } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { TranslocoService } from '@ngneat/transloco'
import { QuangDialogStateModule } from '../quang-dialog.reducers'
import { OfflineActions } from './offline-store/actions'
import { OfflineSelectors } from './offline-store/selectors'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for offline management
 */
export class QuangOfflineService {
  /**
   * message that notifies the user of the lack of connection
   */
  offlineLabel: string = ''

  /**
   * constructor
   * @param quangSnackbar
   * @param translate
   * @param store
   */
  constructor (
    private readonly translate: TranslocoService,
    private readonly store: Store<QuangDialogStateModule>
  ) {
  }

  /**
   * Connection status observer
   */
  getConnectionObserver (): Observable<boolean> {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
  }

  /**
   * Connection status management,
   * if there is no connection, it displays an alert snackbar and sends the disconnected status to the store
   * otherwise it closes the snackbar, if open, and sends the connected status to the store
   */
  observeOffline (): void {
    this.getLabel()
    this.getConnectionObserver().subscribe((connection: boolean) => {
      if (!connection) {
        this.store.dispatch(OfflineActions.offline())
      } else {
        this.store.dispatch(OfflineActions.online())
      }
    })
  }

  /**
   * retrieves the translation of the offline message,
   * in the general translations file the key is always "offline.msg"
   */
  getLabel (): void {
    this.translate.selectTranslate('offline.msg').subscribe((l) => {
      this.offlineLabel = l
    })
  }

  /**
   * convenience method of having lost the connection without knowing the selector name of ngRx
   */
  observeLine (): Observable<any> {
    return this.store.select(OfflineSelectors.selectLine)
  }
}
