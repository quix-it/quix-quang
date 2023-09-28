import { Component, OnInit } from '@angular/core'
import { QuangOfflineService } from '@quix/quang/dialog'

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
