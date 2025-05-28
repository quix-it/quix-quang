import { Injectable, TemplateRef, computed, signal } from '@angular/core'

import { patchState, signalState } from '@ngrx/signals'

export interface ToastData {
  type: 'success' | 'warning' | 'error'
  title?: string
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'top-center' | 'bottom-center'
  timing: number
  text?: string
  textValue?: string
  showCloseButton?: boolean
  date?: Date
  dateFormat?: string
  customTemplate?: TemplateRef<any>
  customIcon?: string
  hideHeader?: boolean
}

@Injectable({
  providedIn: 'root',
})
export class QuangToastService {
  private toastState = signalState({
    count: 0,
    currentTimeout: null as ReturnType<typeof setTimeout> | number | null,
  })

  public isShowing = computed(() => this.toastState.count() > 0)

  count = this.toastState.count
  currentTimeout = this.toastState.currentTimeout

  public openToast(toastData: ToastData): void {
    patchState(this.toastState, {
      count: this.count() + 1,
    })

    this.currentToast.set(toastData)

    if (this.count() > 1) {
      clearTimeout(this.currentTimeout() as number)
      patchState(this.toastState, {
        count: this.count() - 1,
        currentTimeout: null,
      })
    }
    patchState(this.toastState, {
      currentTimeout: setTimeout(() => {
        this.closeToast()
      }, toastData.timing),
    })
  }

  public closeToast(): void {
    this.currentToast.set(null)
    patchState(this.toastState, { count: this.count() - 1 })
  }

  public currentToast = signal<ToastData | null>(null)
}
