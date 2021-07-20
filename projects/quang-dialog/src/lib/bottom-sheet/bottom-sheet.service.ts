import {Injectable} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Injectable({
  providedIn: 'root'
})
export class QuixBottomSheetService {

  constructor(private bottomSheet: MatBottomSheet) {
  }

  /**
   * opens the bottom sheet
   * @param template
   * @param data
   */
  openBottomSheet(template: any, data?: { [key: string]: any }): void {
    this.bottomSheet.open(template, {data: data});
  }
}
