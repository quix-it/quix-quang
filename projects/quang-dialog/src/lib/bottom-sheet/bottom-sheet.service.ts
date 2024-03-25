import { Injectable } from '@angular/core'
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { Observable } from 'rxjs'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for bottom sheet management
 */
export class QuixBottomSheetService {
  /**
   * bottom sheet reference
   */
  bs: any

  /**
   * constructor
   * @param bottomSheet material bottom sheet utility
   */
  constructor (
    private readonly bottomSheet: MatBottomSheet
  ) {
  }

  /**
   * opens the bottom sheet
   * @param template
   * @param data
   */
  openBottomSheet (template: any, data?: { [key: string]: any }): void {
    this.bs = this.bottomSheet.open(template, { data: data })
  }

  /**
   * return the observable of dismiss event
   */
  onDismiss (): Observable<any> {
    return this.bs.afterDismissed()
  }

  /**
   * return the observable of open event
   */
  onOpen (): Observable<any> {
    return this.bs.afterOpened()
  }

  /**
   * return the observable of backdrop click event
   */
  onBackdropClick (): Observable<any> {
    return this.bs.backdropClick()
  }
}
