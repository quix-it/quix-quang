import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { QuangDeviceService } from '../../../../../quang/utility'

@Component({
  selector: 'ks-device',
  templateUrl: './device.component.html',
  styles: []
})
export class DeviceComponent implements OnInit, OnDestroy {
  screenSubscription$: Subscription = new Subscription()
  screen: unknown
  screenOrientation: string = this.device.getScreenOrientation()

  constructor(private readonly device: QuangDeviceService) {}

  ngOnInit(): void {}

  observeScreenOrientation(): void {
    this.device.observeScreenOrientation().subscribe((e) => {
      this.screen = e
    })
  }

  lockScreen(): void {
    this.device.lockScreenOrientation('portrait')
  }

  unlockScreen(): void {
    this.device.unlockScreenOrientation()
  }

  vibrate(): void {
    this.device.vibrate(200)
  }

  vibratePattern(): void {
    this.device.vibrate([
      500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170,
      40, 500
    ])
  }

  ngOnDestroy(): void {
    this.screenSubscription$?.unsubscribe()
  }
}
