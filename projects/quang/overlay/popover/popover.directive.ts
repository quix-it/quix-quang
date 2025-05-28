import { ComponentType } from '@angular/cdk/portal'
import { Directive, TemplateRef, input, signal } from '@angular/core'

import { QuangBaseOverlayDirective } from 'quang/overlay/shared'

import { QuangPopoverComponent } from './popover.component'

@Directive({
  selector: '[quangPopover]',
})
export class QuangPopoverDirective extends QuangBaseOverlayDirective<QuangPopoverComponent> {
  override targetComponentType = signal<ComponentType<QuangPopoverComponent> | undefined>(QuangPopoverComponent)

  override content = input.required<TemplateRef<any> | null>({ alias: 'quangPopover' })
}
