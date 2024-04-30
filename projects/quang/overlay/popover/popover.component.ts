import { ConnectionPositionPair } from '@angular/cdk/overlay'
import { JsonPipe, NgComponentOutlet, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, input, signal } from '@angular/core'

@Component({
  selector: 'quang-popover',
  standalone: true,
  imports: [NgComponentOutlet, NgTemplateOutlet, JsonPipe],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangPopoverComponent {
  content = input<TemplateRef<any> | null>(null)
  positionPair = signal<ConnectionPositionPair | null>(null)
}
