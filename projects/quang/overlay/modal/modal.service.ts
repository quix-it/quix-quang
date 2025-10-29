import {
  ApplicationRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  Type,
  computed,
  createComponent,
  inject,
  signal,
} from '@angular/core'

import { Observable, Subject } from 'rxjs'

import { QuangModalComponent } from './modal.component'

import { ModalInstance } from './models/ModalInstance'
import { ModalOptions } from './models/ModalOptions'

import { MODAL_ID, ModalRef } from './modal-ref'

@Injectable({
  providedIn: 'root',
})
export class QuangModalService {
  private readonly environmentInjector = inject(EnvironmentInjector)
  private readonly appRef = inject(ApplicationRef)

  private modalInstances = signal<ModalInstance[]>([])
  private idCounter = signal(0)

  // Computed properties for easier access
  public modalCount = computed(() => this.modalInstances().length)
  public hasOpenModals = computed(() => this.modalInstances().length > 0)
  public modalIds = computed(() => this.modalInstances().map((instance) => instance.id))

  // Subject to emit when modals are closed
  private modalClosedSubject = new Subject<string>()
  public modalClosed$ = this.modalClosedSubject.asObservable()

  showModal<T = unknown>(
    component: Type<T>,
    options: ModalOptions,
    componentInputs?: Record<string, unknown>
  ): Observable<object | undefined> {
    const id = this.generateId()

    // Create a Subject for this modal's close event
    const closeSubject = new Subject<object | undefined>()

    // Create an injector that provides the modal ID and ModalRef
    const modalInjector = Injector.create({
      providers: [
        { provide: MODAL_ID, useValue: id },
        { provide: ModalRef, useClass: ModalRef },
      ],
      parent: this.environmentInjector,
    })

    // Create the content component instance first with the modal injector
    const contentRef = createComponent(component, {
      elementInjector: modalInjector,
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
      this.close(id)
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
      closeSubject,
    }
    this.modalInstances.update((instances) => [...instances, modalInstance])
    return closeSubject.asObservable()
  }

  close(id: string, data?: object): void {
    const instances = this.modalInstances()
    const instance = instances.find((inst) => inst.id === id)

    if (instance) {
      // Emit the data through the subject before destroying
      instance.closeSubject.next(data)
      instance.closeSubject.complete()

      // Remove the modal
      this.hideModal(id)
    } else {
      console.warn('[QuangModalService] Modal not found:', id)
    }
  }

  hideModal(id?: string): void {
    if (id) {
      // Find and remove modal by id
      const instances = this.modalInstances()
      const index = instances.findIndex((instance: ModalInstance) => instance.id === id)
      if (index !== -1) {
        const modalToClose = instances[index]
        // Complete the subject if not already completed
        if (!modalToClose.closeSubject.closed) {
          modalToClose.closeSubject.next(undefined)
          modalToClose.closeSubject.complete()
        }
        this.destroyModalInstance(modalToClose)
        this.modalInstances.update((instances) => instances.filter((_, i) => i !== index))
        // Emit modal closed event
        this.modalClosedSubject.next(id)
      } else {
        console.warn('[QuangModalService] Modal not found in instances:', id)
      }
    } else {
      // Remove last modal (LIFO - Last In First Out)
      const instances = this.modalInstances()
      const lastModal = instances[instances.length - 1]
      if (lastModal) {
        // Complete the subject if not already completed
        if (!lastModal.closeSubject.closed) {
          lastModal.closeSubject.next(undefined)
          lastModal.closeSubject.complete()
        }
        this.destroyModalInstance(lastModal)
        this.modalInstances.update((instances) => instances.slice(0, -1))
        // Emit modal closed event
        this.modalClosedSubject.next(lastModal.id)
      } else {
        console.warn('[QuangModalService] No modals to hide')
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
    this.idCounter.update((count) => count + 1)
    return `modal-${this.idCounter()}-${Date.now()}`
  }
}
