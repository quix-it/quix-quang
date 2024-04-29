import { ComponentType } from '@angular/cdk/portal'
import { Directive, input, signal } from '@angular/core'

import { QuangTooltipComponent } from './tooltip.component'

import { QuangBaseOverlayDirective } from '../shared'

@Directive({
  selector: '[quangTooltip]',
  standalone: true
})
export class QuangTooltipDirective extends QuangBaseOverlayDirective<QuangTooltipComponent> {
  override _targetComponentType = signal<ComponentType<QuangTooltipComponent> | undefined>(QuangTooltipComponent)
  override content = input.required<string>({ alias: 'quangTooltip' })
  override showMethod = input<'click' | 'hover'>('hover')
}
