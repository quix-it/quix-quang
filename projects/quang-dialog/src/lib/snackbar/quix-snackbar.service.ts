import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
/**
 * utility for snackbar management
 */
export class QuixSnackbarService {
  /**
   * snackbar wrapper
   */
  snackBar: any

  /**
   * constructor
   * @param snackBarService
   */
  constructor (
    private readonly snackBarService: MatSnackBar
  ) {
  }

  /**
   * He opens the snackbar
   * in addition to the configurations,
   * you can pass a function that will be executed when the snackbar action is triggered
   * @param message
   * @param time
   * @param action
   * @param actionFunction
   */
  openSnackbar (message: string, time?: number, action?: string, actionFunction?: any,) {
    this.snackBar = this.snackBarService.open(
      message,
      action,
      {
        duration: time ? time : null
      }
    )
    if (actionFunction) {
      this.snackBar.onAction().subscribe(actionFunction)
    }
  }

  /**
   * closes the snackbar
   */
  closeSnackbar () {
    this.snackBar.dismiss()
  }
}
