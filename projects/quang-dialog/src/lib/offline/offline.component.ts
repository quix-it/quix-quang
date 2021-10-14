import { Component, OnInit } from '@angular/core';
import { QuixOfflineService } from '../../quang-dialog-core/offline/offline.service'

@Component({
  selector: 'ks-offline',
  templateUrl: './offline.component.html',
  styles: [
  ]
})
export class OfflineComponent implements OnInit {

  constructor(
    private readonly offlineService: QuixOfflineService
  ) { }

  ngOnInit(): void {
    this.offlineService.observeOffline()
  }

}
