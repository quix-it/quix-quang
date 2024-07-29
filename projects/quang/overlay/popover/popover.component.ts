import { ConnectionPositionPair } from '@angular/cdk/overlay'
import { NgClass, NgComponentOutlet, NgIf, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, input, signal } from '@angular/core'

@Component({
  selector: 'quang-popover',
  standalone: true,
  imports: [NgComponentOutlet, NgTemplateOutlet, NgClass, NgIf],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuangPopoverComponent {
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
