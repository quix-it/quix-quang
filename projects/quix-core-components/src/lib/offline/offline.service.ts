import {Injectable} from '@angular/core';
import {fromEvent, merge, of} from "rxjs";
import {mapTo} from "rxjs/operators";
import {QuixSnackbarService} from "../snackbar/quix-snackbar.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class QuixOfflineService {

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
    this.getConnectionObserver().subscribe(
      connection => {
        this.getLabel().subscribe(l => {
          if (!connection) {
            this.quixSnackbar.openSnackbar(l)
          } else {
            if (this.quixSnackbar.snackBar) {
              this.quixSnackbar.closeSnackbar()
            }
          }
        })
      })
  }

  getLabel() {
    return this.translate.get('offline.msg')
  }
}
