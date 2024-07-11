import { Injectable, TemplateRef, signal } from '@angular/core'

export interface ToastData {
  type: 'success' | 'warning' | 'error'
  title: string
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'top-center' | 'bottom-center'
  timing: number
  text?: string
  textValue?: string
  showCloseButton?: boolean
  date?: Date
  dateFormat?: string
  customTemplate?: TemplateRef<any>
  customIcon?: string
}

@Injectable({
  providedIn: 'root'
})
export class QuangToastService {
  public showToast = signal<boolean>(false)
  currentToast = signal<ToastData | null>(null)

  openToast(toastData: ToastData): void {
    this.currentToast.set(toastData)
    this.showToast.set(true)
  }

  closeToast(): void {
    this.currentToast.set(null)
    this.showToast.set(false)
  }
}
