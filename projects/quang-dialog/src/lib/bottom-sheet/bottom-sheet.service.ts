import {Injectable} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Injectable({
  providedIn: 'root'
})
export class QuixBottomSheetService {

  constructor(private bottomSheet: MatBottomSheet) {
  }

  openBottomSheet(template: any, data?: { [key: string]: any }) {
    this.bottomSheet.open(template, {data: data});
  }
}
