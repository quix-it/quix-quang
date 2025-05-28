import { ConnectionPositionPair } from '@angular/cdk/overlay'
import { Component, input, signal } from '@angular/core'

@Component({
  selector: 'quang-base-overlay-component',
  standalone: true,
  template: ``,
})
export abstract class QuangBaseOverlayComponent {
  content = input.required<any>()

  payload = input<any>()

  positionPair = signal<ConnectionPositionPair | null>(null)
}
