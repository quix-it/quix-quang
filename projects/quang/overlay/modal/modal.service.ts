import { ApplicationRef, EnvironmentInjector, Injectable, Type, createComponent, inject } from '@angular/core'

import { Subject } from 'rxjs'

import { QuangModalComponent } from './modal.component'

import { ModalInstance } from './models/ModalInstance'
import { ModalOptions } from './models/ModalOptions'

@Injectable({
  providedIn: 'root',
})
export class QuangModalService {
  private readonly environmentInjector = inject(EnvironmentInjector)
  private readonly appRef = inject(ApplicationRef)

  private modalInstances: ModalInstance[] = []
  private idCounter = 0

  // Subject to emit when modals are closed
  private modalClosedSubject = new Subject<string>()
  public modalClosed$ = this.modalClosedSubject.asObservable()

  showModal<T = unknown>(component: Type<T>, options: ModalOptions, componentInputs?: Record<string, unknown>): string {
    const id = this.generateId()

    // Create the content component instance first
    const contentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
    })

    // Set component inputs if provided
    if (componentInputs) {
      Object.entries(componentInputs).forEach(([key, value]) => {
        contentRef.setInput(key, value)
      })
    }

    // Create the modal component instance with content projected in body slot
    const modalRef = createComponent(QuangModalComponent, {
      environmentInjector: this.environmentInjector,
      projectableNodes: [
        [], // header slot (empty)
        [contentRef.location.nativeElement], // body slot (content component)
        [], // footer slot (empty)
      ],
    })

    // Set modal inputs from options
    modalRef.setInput('position', options.position)
    if (options.height !== undefined) modalRef.setInput('height', options.height)
    if (options.width !== undefined) modalRef.setInput('width', options.width)
    if (options.padding !== undefined) modalRef.setInput('padding', options.padding)
    if (options.containerClass !== undefined) modalRef.setInput('containerClass', options.containerClass)
    if (options.animationMode !== undefined) modalRef.setInput('animationMode', options.animationMode)
    if (options.backgroundColor !== undefined) modalRef.setInput('backgroundColor', options.backgroundColor)
    if (options.showBackdrop !== undefined) modalRef.setInput('showBackdrop', options.showBackdrop)

    // Subscribe to backdrop click to close modal
    modalRef.instance.backdropClick.subscribe(() => {
      this.hideModal(id)
    })

    // Attach components to the application
    this.appRef.attachView(contentRef.hostView)
    this.appRef.attachView(modalRef.hostView)

    // Add modal to DOM
    document.body.appendChild(modalRef.location.nativeElement)

    // Store modal instance
    const modalInstance: ModalInstance = {
      id,
      modalRef,
      contentRef,
    }
    this.modalInstances.push(modalInstance)

    return id
  }

  hideModal(id?: string): void {
    if (id) {
      // Find and remove modal by id
      const index = this.modalInstances.findIndex((instance) => instance.id === id)
      if (index !== -1) {
        const modalToClose = this.modalInstances[index]
        this.destroyModalInstance(modalToClose)
        this.modalInstances.splice(index, 1)
        // Emit modal closed event
        this.modalClosedSubject.next(id)
      }
    } else {
      // Remove last modal (LIFO - Last In First Out)
      const lastModal = this.modalInstances.pop()
      if (lastModal) {
        this.destroyModalInstance(lastModal)
        // Emit modal closed event
        this.modalClosedSubject.next(lastModal.id)
      }
    }
  }

  private destroyModalInstance(instance: ModalInstance): void {
    // Close the modal component (triggers overlay cleanup)
    instance.modalRef.instance.closeModal()

    // Detach from application
    this.appRef.detachView(instance.contentRef.hostView)
    this.appRef.detachView(instance.modalRef.hostView)

    // Remove from DOM if still attached
    if (instance.modalRef.location.nativeElement.parentNode) {
      instance.modalRef.location.nativeElement.parentNode.removeChild(instance.modalRef.location.nativeElement)
    }

    // Destroy component references
    instance.contentRef.destroy()
    instance.modalRef.destroy()
  }

  private generateId(): string {
    return `modal-${++this.idCounter}-${Date.now()}`
  }
}
