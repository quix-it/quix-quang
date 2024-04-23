import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class QuangToastService {
  public showToast = signal<boolean>(false)
  currentToast = signal<{
    type: 'success' | 'warning' | 'error'
    title: string
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'top-center' | 'bottom-center'
    timing: number
    text?: string
    textValue?: string
    date?: Date
    dateFormat?: string
  } | null>(null)

  openToast(
    type: 'success' | 'warning' | 'error',
    title: string,
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'top-center' | 'bottom-center',
    timing: number,
    text?: string,
    textValue?: string,
    date?: Date,
    dateFormat?: string
  ): void {
    this.currentToast.set({
      type,
      title,
      position,
      timing,
      text,
      textValue,
      date,
      dateFormat
    })
    this.showToast.set(true)
    // setTimeout(() => {
    //   this.closeToast()
    // }, timing)
  }

  closeToast(): void {
    this.currentToast.set(null)
    this.showToast.set(false)
  }
}
