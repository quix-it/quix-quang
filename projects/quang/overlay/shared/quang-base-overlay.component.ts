import { ConnectionPositionPair } from '@angular/cdk/overlay'
import { Component, input, signal } from '@angular/core'

@Component({
  selector: 'quang-base-overlay-component',

  template: ``,
})
export abstract class QuangBaseOverlayComponent {
  overlayContent = input.required<any>()

  payload = input<any>()

  positionPair = signal<ConnectionPositionPair | null>(null)
}
