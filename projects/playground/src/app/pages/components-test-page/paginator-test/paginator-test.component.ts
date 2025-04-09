import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangPaginatorComponent } from '@quang/components/paginator'

@Component({
  selector: 'playground-paginator-test',
  imports: [QuangPaginatorComponent, FormsModule, ReactiveFormsModule, JsonPipe, TranslocoPipe],

  templateUrl: './paginator-test.component.html',
  styleUrl: './paginator-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorTestComponent {
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
