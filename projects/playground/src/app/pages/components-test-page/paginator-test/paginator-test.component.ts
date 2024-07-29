import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { QuangPaginatorComponent } from '@quix/quang/components/paginator'

@Component({
  selector: 'playground-paginator-test',
  standalone: true,
  imports: [QuangPaginatorComponent, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './paginator-test.component.html',
  styleUrl: './paginator-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorTestComponent {
  formBuilder = signal(inject(NonNullableFormBuilder))

  sizeList = [10, 20, 30, 40, 50]

  testForm = signal(
    this.formBuilder().group({
      page: 1,
      pageSize: 10,
    })
  )

  onChangePage(page: number): void {
    this.testForm().controls.page.patchValue(page)
    console.log(page)
  }

  onChangePageSize(pageSize: number): void {
    this.testForm().controls.pageSize.patchValue(pageSize)
    console.log(pageSize)
  }

  // onSubmit() {
  //   console.log(this.testForm().value)
  // }
}
