import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class QuangToastService {
  public showToast = signal<boolean>(false)
  openToast(): void {
    this.showToast.set(true)
  }

  closeToast(): void {
    this.showToast.set(false)
  }
}
