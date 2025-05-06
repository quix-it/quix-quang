import { ConnectionPositionPair } from '@angular/cdk/overlay'
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, input, signal } from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'

import { QuangBaseOverlayComponent } from 'quang/overlay/shared'

@Component({
  selector: 'quang-popover',
  imports: [NgTemplateOutlet, NgClass, NgIf],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  standalone: true,
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
  popoverContent = input<TemplateRef<any> | null>(null)

  positionPair = signal<ConnectionPositionPair | null>(null)

  payload = input<any>()

  getPopoverPosition = signal<string>('')

  onChangePositionPair$ = toObservable(this.positionPair)
    .pipe(takeUntilDestroyed())
    .subscribe((positionPair) => {
      const originX = positionPair?.originX
      const originY = positionPair?.originY
      if (originX && originY) {
        this.getPopoverPosition.set(`${originX}-${originY}`)
      } else {
        this.getPopoverPosition.set('')
      }
    })
}
