import { ConnectionPositionPair } from '@angular/cdk/overlay'
import { Component, input, signal } from '@angular/core'

@Component({
  selector: 'quang-base-overlay-component',

  template: ``,
})
export abstract class QuangBaseOverlayComponent<TContent = unknown, TPayload = unknown> {
  overlayContent = input.required<TContent>()

  payload = input<TPayload>()

  positionPair = signal<ConnectionPositionPair | null>(null)
}
