import { Component } from '@angular/core'
import { QuixSnackbarService } from '../../quang-dialog-core/snackbar/quix-snackbar.service'

@Component({
  selector: 'ks-snackbar',
  templateUrl: './snackbar.component.html',
  styles: []
})
export class SnackbarComponent {

  constructor (
    private readonly snackbarService: QuixSnackbarService
  ) { }

  openSnackbar (): void {
    this.snackbarService.openSnackbar(
      'Testo di esempio',
      5000,
      'Alert',
      () => {alert('action function')}
    )
  }
}
