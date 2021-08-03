import { Injectable } from '@angular/core'
import { MatBottomSheet } from '@angular/material/bottom-sheet'

@Injectable({
  providedIn: 'root'
})
/**
 * utility for bottom sheet management
 */
export class QuixBottomSheetService {
  /**
   * constructor
   * @param bottomSheet
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
    this.bottomSheet.open(template, { data: data })
  }
}
