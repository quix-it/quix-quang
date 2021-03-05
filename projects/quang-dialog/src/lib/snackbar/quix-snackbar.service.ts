import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class QuixSnackbarService {
  snackBar: any;

  constructor(private snackBarService: MatSnackBar) {
  }

  openSnackbar(message: string, time?: number, action?: string, actionFunction?: any,) {
    this.snackBar = this.snackBarService.open(message, action, {
      duration: time ? time : null
    });
    if (actionFunction) {
      this.snackBar.onAction().subscribe(actionFunction);
    }
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
