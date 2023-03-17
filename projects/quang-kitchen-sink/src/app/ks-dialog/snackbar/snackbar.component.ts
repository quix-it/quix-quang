import { Component } from '@angular/core'
import { QuangSnackbarService } from '../../../../../quang-dialog/src/lib/snackbar/quang-snackbar.service'

@Component({
  selector: 'ks-snackbar',
  templateUrl: './snackbar.component.html',
  styles: []
})
export class SnackbarComponent {
  constructor(private readonly snackbarService: QuangSnackbarService) {}

  openSnackbar(): void {
    this.snackbarService.openSnackbar('Testo di esempio', 5000, 'Alert', () => {
      alert('action function')
    })
  }
}
