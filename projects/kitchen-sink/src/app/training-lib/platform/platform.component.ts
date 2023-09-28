import { Component } from '@angular/core'
import {
  getSupportedInputTypes,
  supportsPassiveEventListeners,
  supportsScrollBehavior,
  Platform
} from '@angular/cdk/platform'

@Component({
  selector: 'ks-platform',
  templateUrl: './platform.component.html',
  styles: []
})
export class PlatformComponent {
  supportedInputTypes: string[] = Array.from(getSupportedInputTypes())
  supportsPassiveEventListeners: boolean = supportsPassiveEventListeners()
  supportsScrollBehavior: boolean = supportsScrollBehavior()

  constructor(public readonly platform: Platform) {}
}
