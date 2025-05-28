import { Component, computed, inject, viewChild } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangPopoverDirective } from 'quang/overlay/popover'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { QuangPopoverComponent } from 'quang/overlay/popover/popover.component'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-popover-test-page',
  imports: [QuangPopoverDirective, TranslocoPipe, ComponentDocumentationComponent, SourceCodeDirective],
  templateUrl: './popover-test-page.component.html',
  styleUrl: './popover-test-page.component.scss',
})
export class PopoverTestPageComponent {
  protected PopoverTestPageComponent = QuangPopoverComponent
  private readonly quangTranslationService = inject(QuangTranslationService)
  testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      console.log('testComponent', document.getElementById('testComponent'))
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/popover.md' : './assets/docs/popover.it.md'
  )
}
