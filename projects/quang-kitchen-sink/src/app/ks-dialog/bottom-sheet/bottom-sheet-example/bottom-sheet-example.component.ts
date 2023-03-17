import { Component, Inject, OnInit } from '@angular/core'
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef
} from '@angular/material/bottom-sheet'

@Component({
  selector: 'ks-bottom-sheet-example',
  templateUrl: './bottom-sheet-example.component.html',
  styles: []
})
export class BottomSheetExampleComponent {
  constructor(
    private readonly bottomSheetRef: MatBottomSheetRef<BottomSheetExampleComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { [key: string]: any }
  ) {}

  close(): void {
    this.bottomSheetRef.dismiss('close')
  }

  save(): void {
    this.bottomSheetRef.dismiss('Valore di ritorno')
  }
}
