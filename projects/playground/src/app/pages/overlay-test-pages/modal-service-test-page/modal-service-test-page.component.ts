import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangModalService } from 'quang/overlay/modal'
import { QuangTranslationService } from 'quang/translation'
import { Subscription } from 'rxjs'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { TestModalContentComponent } from '../modal-test-page/test-modal-content.component'

@Component({
  selector: 'playground-modal-service-test-page',
  imports: [TranslocoPipe, ComponentDocumentationComponent],
  templateUrl: './modal-service-test-page.component.html',
  styleUrl: './modal-service-test-page.component.scss',
})
export class ModalServiceTestPageComponent implements OnInit, OnDestroy {
  protected ModalServiceTestPageComponent = ModalServiceTestPageComponent
  private readonly quangTranslationService = inject(QuangTranslationService)
  private readonly modalService = inject(QuangModalService)

  private modalClosedSubscription?: Subscription

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en'
      ? './assets/docs/modal-service.md'
      : './assets/docs/modal-service.it.md'
  )

  // Store modal IDs for tracking multiple modals
  openModalIds = signal<string[]>([])

  ngOnInit(): void {
    // Subscribe to modal closed events
    this.modalClosedSubscription = this.modalService.modalClosed$.subscribe((modalId) => {
      this.removeModalFromList(modalId)
    })
  }

  ngOnDestroy(): void {
    this.modalClosedSubscription?.unsubscribe()
  }

  // Service modal tests - supports multiple modals
  openServiceModal(position: 'left' | 'right' | 'center' = 'center'): void {
    const modalId = this.modalService.showModal(
      TestModalContentComponent,
      {
        position,
        height: '60vh',
        width: '50vw',
        animationMode: 'FADE',
        showBackdrop: true,
      },
      {
        // Pass callback to track modals opened from within modals
        onModalCreated: (newModalId: string) => this.addModalToList(newModalId),
      }
    )

    // Add the new modal ID to the list
    this.addModalToList(modalId)
  }

  closeLastModal(): void {
    this.modalService.hideModal()
    // Note: Modal will be removed from list automatically via modalClosed$ subscription
  }

  closeModalById(id: string): void {
    this.modalService.hideModal(id)
    // Note: Modal will be removed from list automatically via modalClosed$ subscription
  }

  closeAllModals(): void {
    // Close all modals by calling hideModal repeatedly
    while (this.openModalIds().length > 0) {
      this.modalService.hideModal()
      // Note: Modals will be removed from list automatically via modalClosed$ subscription
    }
  }

  private addModalToList(modalId: string): void {
    this.openModalIds.update((ids) => [...ids, modalId])
  }

  private removeModalFromList(modalId: string): void {
    this.openModalIds.update((ids) => ids.filter((id) => id !== modalId))
  }
}
