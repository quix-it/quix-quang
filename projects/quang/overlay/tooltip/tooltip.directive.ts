import { ComponentType } from '@angular/cdk/portal'
import { Directive, input, signal } from '@angular/core'

import { QuangBaseOverlayDirective } from '@quix/quang/overlay/shared'

import { QuangTooltipComponent } from './tooltip.component'

@Directive({
  selector: '[quangTooltip]',
})
export class QuangTooltipDirective extends QuangBaseOverlayDirective<QuangTooltipComponent> {
  override targetComponentType = signal<ComponentType<QuangTooltipComponent> | undefined>(QuangTooltipComponent)

  override content = input.required<string>({ alias: 'quangTooltip' })

  override showMethod = input<'click' | 'hover'>('hover')
}
