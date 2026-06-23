import { Component, computed, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangModalComponent } from 'quang/overlay/modal'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { QuangDateComponent } from 'quang/components/date'

@Component({
  selector: 'playground-modal-test-page',
  imports: [
    QuangModalComponent,
    QuangDateComponent,
    ReactiveFormsModule,
    TranslocoPipe,
    ComponentDocumentationComponent,
  ],
  templateUrl: './modal-test-page.component.html',
  styleUrl: './modal-test-page.component.scss',
})
export class ModalTestPageComponent {
  protected ModalTestPageComponent = ModalTestPageComponent
  private readonly quangTranslationService = inject(QuangTranslationService)
  private readonly formBuilder = inject(NonNullableFormBuilder)

  dateInModalForm = this.formBuilder.group({
    dateInModal: this.formBuilder.control<string>(''),
  })

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/modal.md' : './assets/docs/modal-it.md'
  )
  showModal = signal<boolean>(false)
  content = signal<string>('content')

  openModal(): void {
    this.showModal.set(true)
  }

  closeModal(): void {
    this.showModal.set(false)
  }

  btnAction(): void {
    this.content.update((content) => `${content}!!!`)
  }
}
