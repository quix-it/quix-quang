import { animate, state, style, transition, trigger } from '@angular/animations'
import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay'
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'

import { QuangBaseOverlayComponent } from '../shared/quang-base-overlay.component'

@Component({
  selector: 'quang-tooltip',
  standalone: true,
  imports: [OverlayModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      state('*', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class QuangTooltipComponent implements QuangBaseOverlayComponent {
  content = input<string>('')

  quangTooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top')

  positionPair = signal<ConnectionPositionPair | null>(null)

  payload = input<unknown>()
}
