import {Injectable} from '@angular/core';
import {fromEvent, merge, of} from "rxjs";
import {mapTo} from "rxjs/operators";
import {QuixSnackbarService} from "../snackbar/quix-snackbar.service";
import {select, Store} from "@ngrx/store";
import {offline, online} from "./offline-store/offline.action";
import {selectLine} from "./offline-store/offline.selector";
import { TranslocoService } from '@ngneat/transloco'

@Injectable({
  providedIn: 'root'
})
export class QuixOfflineService {
  offlineLabel: string

  constructor(
    private quixSnackbar: QuixSnackbarService,
    private translate: TranslocoService,
    private store: Store<any>
  ) {
  }

  getConnectionObserver() {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)),
    );
  }

  observeOffline() {
    this.getLabel()
    this.getConnectionObserver().subscribe(
      connection => {
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

  getLabel() {
    this.translate.selectTranslate('offline.msg').subscribe(l => this.offlineLabel = l)
  }

  observeLine(){
    return this.store.pipe(select(selectLine))
  }
}
