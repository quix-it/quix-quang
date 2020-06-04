import {Injectable} from '@angular/core';
import {fromEvent, merge, of} from "rxjs";
import {mapTo} from "rxjs/operators";
import {QuixSnackbarService} from "../snackbar/quix-snackbar.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class QuixOfflineService {
  offlineLabel: string

  constructor(
    private quixSnackbar: QuixSnackbarService,
    private translate: TranslateService
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
          this.quixSnackbar.openSnackbar(this.offlineLabel)
        } else {
          if (this.quixSnackbar.snackBar) {
            this.quixSnackbar.closeSnackbar()
          }
        }
      })
  }

  getLabel() {
    this.translate.get('offline.msg').subscribe(l => this.offlineLabel = l)
  }
}
