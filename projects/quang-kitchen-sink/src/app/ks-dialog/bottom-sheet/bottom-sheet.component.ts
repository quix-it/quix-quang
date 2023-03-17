import { Component } from '@angular/core'
import { BottomSheetExampleComponent } from './bottom-sheet-example/bottom-sheet-example.component'
import { merge } from 'rxjs'
import { QuangBottomSheetService } from '../../../../../quang-dialog/src/lib/bottom-sheet/bottom-sheet.service'

@Component({
  selector: 'ks-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styles: []
})
export class BottomSheetComponent {
  bottomSheet: any = BottomSheetExampleComponent
  events: string[] = []

  constructor(private readonly bottomSheetService: QuangBottomSheetService) {}

  openBottom(): void {
    this.events = []
    this.bottomSheetService.openBottomSheet(this.bottomSheet, {
      param: 'Custom param'
    })
    merge(
      this.bottomSheetService.onDismiss(),
      this.bottomSheetService.onOpen(),
      this.bottomSheetService.onBackdropClick()
    ).subscribe((v) => {
      this.events.push(v as string)
    })
  }
}
