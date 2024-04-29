import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, input } from '@angular/core'

@Component({
  selector: 'quang-popover',
  standalone: true,
  imports: [NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangPopoverComponent {
  content = input<TemplateRef<any> | null>(null)
}
