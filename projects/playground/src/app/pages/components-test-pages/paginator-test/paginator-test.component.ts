import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { QuangPaginatorComponent } from 'quang/components/paginator'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-paginator-test',
  imports: [
    QuangPaginatorComponent,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    TranslocoPipe,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],

  templateUrl: './paginator-test.component.html',
  styleUrl: './paginator-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorTestComponent {
  protected PaginatorTestComponent = QuangPaginatorComponent

  private readonly quangTranslationService = inject(QuangTranslationService)
  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/paginator.md' : './assets/docs/paginator.it.md'
  )

  formBuilder = inject(NonNullableFormBuilder)

  sizeList = [10, 20, 30, 40, 50]

  testForm = this.formBuilder.group({
    page: 1,
    pageSize: 10,
  })

  onChangePage(page: number): void {
    this.testForm.controls.page.patchValue(page)
    console.log(page)
  }

  onChangePageSize(pageSize: number): void {
    this.testForm.controls.pageSize.patchValue(pageSize)
    console.log(pageSize)
  }
}
