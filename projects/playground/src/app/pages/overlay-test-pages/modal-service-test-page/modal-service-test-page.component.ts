import { Component, computed, inject, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangModalService } from 'quang/overlay/modal'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { TestModalContentComponent } from '../modal-test-page/test-modal-content.component'

@Component({
  selector: 'playground-modal-service-test-page',
  imports: [TranslocoPipe, ComponentDocumentationComponent],
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
      : './assets/docs/modal-service.it.md'
  )

  // Store modal IDs for testing
  openModalIds = signal<string[]>([])

  // Service modal tests
  openServiceModal(position: 'left' | 'right' | 'center' = 'center'): void {
    const modalId = this.modalService.showModal(TestModalContentComponent, {
      position,
      height: '60vh',
      width: '50vw',
      animationMode: 'FADE',
      showBackdrop: true,
    })

    this.openModalIds.update((ids) => [...ids, modalId])
  }

  closeLastModal(): void {
    this.modalService.hideModal()
    this.openModalIds.update((ids) => ids.slice(0, -1))
  }

  closeModalById(id: string): void {
    this.modalService.hideModal(id)
    this.openModalIds.update((ids) => ids.filter((modalId) => modalId !== id))
  }

  closeAllModals(): void {
    // Close all modals by calling hideModal repeatedly
    while (this.openModalIds().length > 0) {
      this.modalService.hideModal()
      this.openModalIds.update((ids) => ids.slice(0, -1))
    }
  }
}
