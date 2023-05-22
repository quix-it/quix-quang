import { Component, OnInit } from '@angular/core'
import { QuangOfflineService } from '../../../../../quang/dialog/src/lib/offline/offline.service'

@Component({
  selector: 'ks-offline',
  templateUrl: './offline.component.html',
  styles: []
})
export class OfflineComponent implements OnInit {
  constructor(private readonly offlineService: QuangOfflineService) {}

  ngOnInit(): void {
    this.offlineService.observeOffline()
  }
}
