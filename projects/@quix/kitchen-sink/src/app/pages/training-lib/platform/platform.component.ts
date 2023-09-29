import {
  Platform,
  getSupportedInputTypes,
  supportsPassiveEventListeners,
  supportsScrollBehavior
} from '@angular/cdk/platform'
import { Component } from '@angular/core'

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
