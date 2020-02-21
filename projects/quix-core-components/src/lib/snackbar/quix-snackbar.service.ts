import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';


@Injectable()
export class QuixSnackbarService {
  snackBar: any;

  constructor(private snackBarService: MatSnackBar) {
  }

  openSnackbar(message: string, action: string, actionFunction?: any, time?: number) {
    this.snackBar = this.snackBarService.open(message, action, {
      duration: time ? time : 3000
    });
    if (actionFunction) {
      this.snackBar.onAction().subscribe(actionFunction);
    }
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
