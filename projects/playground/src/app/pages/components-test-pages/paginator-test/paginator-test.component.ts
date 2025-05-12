import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

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
  protected PaginatorTestComponent = PaginatorTestComponent

  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      console.log('testComponent', document.getElementById('testComponent'))
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = '/assets/docs/paginator.md'

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

// Add playground-component-documentation in the template
// <playground-component-documentation
//   [componentType]="PaginatorTestComponent"
//   [customReadmePath]="componentsReadmePath"
// ></playground-component-documentation>
