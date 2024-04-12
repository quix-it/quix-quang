import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class QuangLoaderService {
  public _isLoading = signal<boolean>(false)

  show(): void {
    this._isLoading.set(true)
  }

  hide(): void {
    this._isLoading.set(false)
  }
}
