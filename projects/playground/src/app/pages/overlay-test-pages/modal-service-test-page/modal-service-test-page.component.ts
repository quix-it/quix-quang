import { JsonPipe } from '@angular/common'
import { Component, computed, inject, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangModalService } from 'quang/overlay/modal'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { TestModalContentComponent } from './test-modal-content/test-modal-content.component'

@Component({
  selector: 'playground-modal-service-test-page',
  imports: [TranslocoPipe, ComponentDocumentationComponent, JsonPipe],
  templateUrl: './modal-service-test-page.component.html',
  styleUrl: './modal-service-test-page.component.scss',
})
export class ModalServiceTestPageComponent {
  protected ModalServiceTestPageComponent = ModalServiceTestPageComponent
  private readonly quangTranslationService = inject(QuangTranslationService)
  private readonly modalService = inject(QuangModalService)

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en'
      ? './assets/docs/modal-service.md'
      : './assets/docs/modal-service-it.md'
  )

  // Use signals from the modal service instead of local state
  readonly openModalIds = this.modalService.modalIds
  readonly modalCount = this.modalService.modalCount
  readonly hasOpenModals = this.modalService.hasOpenModals

  // Signal to track last modal result
  lastModalResult = signal<object | undefined>(undefined)

  // Service modal tests - supports multiple modals
  openServiceModal(position: 'left' | 'right' | 'center' = 'center'): void {
    const modalData = this.modalService.showModal(TestModalContentComponent, {
      position,
      height: '60vh',
      width: '50vw',
      animationMode: 'FADE',
      showBackdrop: true,
    })
    modalData.closeCallback.subscribe({
      next: (result) => {
        console.log('Modal chiusa con risultato:', result)
        this.lastModalResult.set(result)
      },
    })
  }
}
