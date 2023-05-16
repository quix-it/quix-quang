import { Injectable } from '@angular/core'
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for snackbar management
 */
export class QuangSnackbarService {
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
  openSnackbar (message: string, time?: number, action?: string, actionFunction?: any): void {
    this.snackBar = this.snackBarService.open(
      message,
      action,
      {
        duration: time || undefined
      }
    )
    if (actionFunction) {
      this.snackBar.onAction().subscribe(actionFunction)
    }
  }

  /**
   * closes the snackbar
   */
  closeSnackbar (): void {
    this.snackBar.dismiss()
  }
}
