import { Component, computed, viewChild } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangPopoverDirective } from 'quang/overlay/popover'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'

@Component({
  selector: 'playground-popover-test-page',
  imports: [QuangPopoverDirective, TranslocoPipe, ComponentDocumentationComponent],
  templateUrl: './popover-test-page.component.html',
  styleUrl: './popover-test-page.component.scss',
})
export class PopoverTestPageComponent {
  protected PopoverTestPageComponent = PopoverTestPageComponent

  testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      console.log('testComponent', document.getElementById('testComponent'))
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = './assets/docs/popover.md'
}
