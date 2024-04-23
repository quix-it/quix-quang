import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'quang-popover',
  standalone: true,
  imports: [],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangPopoverComponent {}
