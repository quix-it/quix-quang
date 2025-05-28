import { Component, TemplateRef, computed, inject, viewChild } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangToastService } from 'quang/overlay/toast'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'

@Component({
  selector: 'playground-toast-test-page',
  imports: [TranslocoPipe, ComponentDocumentationComponent],
  templateUrl: './toast-test-page.component.html',
  styleUrl: './toast-test-page.component.scss',
})
export class ToastTestPageComponent {
  protected ToastTestPageComponent = ToastTestPageComponent

  private readonly quangTranslationService = inject(QuangTranslationService)
  private readonly customToast = viewChild<TemplateRef<any>>('customToast')
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
  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/toast.md' : './assets/docs/toast.it.md'
  )

  openToast(type: 'success' | 'warning' | 'error', customIcon?: boolean): void {
    this.quangToast.openToast({
      type,
      title: type,
      position: 'bottom-center',
      text: 'beauty button here',
      customTemplate: this.customToast(),
      showCloseButton: true,
      customIcon: customIcon ? './assets/icons/svg/calendar.svg' : '',
      timing: 5000,
    })
  }
}
