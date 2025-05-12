import { Component, computed, inject, viewChild } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangToastService } from 'quang/overlay/toast'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-tooltip-test-page',
  imports: [QuangTooltipDirective, TranslocoPipe, ComponentDocumentationComponent, SourceCodeDirective],
  templateUrl: './tooltip-test-page.component.html',
  styleUrl: './tooltip-test-page.component.scss',
})
export class TooltipTestPageComponent {
  protected TooltipTestPageComponent = TooltipTestPageComponent
  private readonly quangToast = inject(QuangToastService)

  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      console.log('testComponent', document.getElementById('testComponent'))
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  // Path to the components README.md file
  componentsReadmePath = './assets/docs/tooltip.md'

  openToast(type: 'success' | 'warning' | 'error', customIcon?: boolean): void {
    this.quangToast.openToast({
      type,
      title: type,
      position: 'bottom-center',
      text: 'beauty button here',
      // customTemplate: this.customToast,
      showCloseButton: true,
      customIcon: customIcon ? './assets/icons/svg/calendar.svg' : '',
      timing: 5000,
    })
  }
}
