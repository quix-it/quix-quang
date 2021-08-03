import { Injectable } from '@angular/core'
import { fromEvent, merge, Observable, of } from 'rxjs'
import { mapTo } from 'rxjs/operators'
import { QuixSnackbarService } from '../snackbar/quix-snackbar.service'
import { select, Store } from '@ngrx/store'
import { offline, online } from './offline-store/offline.action'
import { selectLine } from './offline-store/offline.selector'
import { TranslocoService } from '@ngneat/transloco'

@Injectable({
  providedIn: 'root'
})
/**
 * utility for offline management
 */
export class QuixOfflineService {
  /**
   * message that notifies the user of the lack of connection
   */
  offlineLabel: string

  /**
   * constructor
   * @param quixSnackbar
   * @param translate
   * @param store
   */
  constructor (
    private readonly quixSnackbar: QuixSnackbarService,
    private readonly translate: TranslocoService,
    private readonly store: Store<any>
  ) {
  }

  /**
   * Connection status observer
   */
  getConnectionObserver (): Observable<boolean> {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)),
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
        this.store.dispatch(offline())
        this.quixSnackbar.openSnackbar(this.offlineLabel)
      } else {
        this.store.dispatch(online())
        if (this.quixSnackbar.snackBar) {
          this.quixSnackbar.closeSnackbar()
        }
      }
    })
  }

  /**
   * retrieves the translation of the offline message,
   * in the general translations file the key is always "offline.msg"
   */
  getLabel (): void {
    this.translate.selectTranslate('offline.msg').subscribe(l => this.offlineLabel = l)
  }

  /**
   * convenience method of having lost the connection without knowing the selector name of ngRx
   */
  observeLine (): Observable<any> {
    return this.store.pipe(select(selectLine))
  }
}
