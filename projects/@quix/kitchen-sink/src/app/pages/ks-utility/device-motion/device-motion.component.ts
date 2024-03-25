import { Component } from '@angular/core'

import { Observable } from 'rxjs'

import { QuangDeviceMotionService } from '@quix/quang/utility'

@Component({
  selector: 'ks-device-motion',
  templateUrl: './device-motion.component.html',
  styles: []
})
export class DeviceMotionComponent {
  event$: Observable<any> = this.motion.getDeviceMotion()

  constructor(private readonly motion: QuangDeviceMotionService) {}
}
