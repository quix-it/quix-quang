import { Component } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangPopoverDirective } from 'quang/overlay/popover'

@Component({
  selector: 'playground-popover-test-page',
  imports: [QuangPopoverDirective, TranslocoPipe],
  templateUrl: './popover-test-page.component.html',
  styleUrl: './popover-test-page.component.scss',
})
export class PopoverTestPageComponent {}
