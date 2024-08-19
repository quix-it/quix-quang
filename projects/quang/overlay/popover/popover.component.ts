import { ConnectionPositionPair } from '@angular/cdk/overlay'
import { NgClass, NgComponentOutlet, NgIf, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, input, signal } from '@angular/core'

import { QuangBaseOverlayComponent } from '@quix/quang/overlay/shared'

@Component({
  selector: 'quang-popover',
  standalone: true,
  imports: [NgComponentOutlet, NgTemplateOutlet, NgClass, NgIf],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Popover component that can render custom content, passed from the outside as a `TemplateRef`
 * @example
 * <button
        [quangPopover]="popoverTest"
        [scrollCloseThreshold]="undefined"
        class="btn popover-test-button"
        overlayPosition="top"
        showMethod="click"
      >
        {{ 'buttons.popover' | transloco }}
        <span>CLICK</span>
      </button>
      <ng-template #popoverTest> <span>test works!</span> <button type="button">click!</button> </ng-template>
 */
export class QuangPopoverComponent implements QuangBaseOverlayComponent {
  content = input<TemplateRef<any> | null>(null)

  positionPair = signal<ConnectionPositionPair | null>(null)

  payload = input<any>()

  getPopoverPosition(): string {
    const originX = this.positionPair()?.originX
    const originY = this.positionPair()?.originY
    if (originX && originY) {
      return `${originX}-${originY}`
    }
    return ''
  }
}
