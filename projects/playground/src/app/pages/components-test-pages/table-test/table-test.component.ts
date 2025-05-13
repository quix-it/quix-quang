import { NgIf } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  TemplateRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangPopoverDirective } from 'quang/overlay/popover'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { QuangCheckboxComponent } from 'quang/components/checkbox'
import {
  QuangTableComponent,
  SortCol,
  SortTable,
  TableConfiguration,
  TableHeader,
  TableRow,
} from 'quang/components/table/table.component'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

interface People {
  name: string
  age: number
  gender: string
  id: number
}

@Component({
  selector: 'playground-table-test',
  imports: [
    QuangTableComponent,
    QuangPopoverDirective,
    TranslocoPipe,
    AngularSvgIconModule,
    QuangCheckboxComponent,
    ReactiveFormsModule,
    NgIf,
    ComponentDocumentationComponent,
    SourceCodeDirective,
  ],

  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableTestComponent {
  protected TableTestComponent = QuangTableComponent

  private readonly checkboxRenderer = viewChild<TemplateRef<any>>('checkboxRenderer')
  private readonly name3 = viewChild<TemplateRef<any>>('name3')
  private readonly actions = viewChild<TemplateRef<any>>('actions')
  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      console.log('testComponent', document.getElementById('testComponent'))
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = '/assets/docs/table.md'

  readonly people: People[] = [
    {
      name: 'John Doewe',
      age: 30,
      gender: 'Male',
      id: 1,
    },
    {
      name: 'Jane Doe',
      age: 25,
      gender: 'Female',
      id: 2,
    },
    {
      name: 'Peter Parker',
      age: 20,
      gender: 'Male',
      id: 3,
    },
    {
      name: 'Mary Jane',
      age: 22,
      gender: 'Female',
      id: 4,
    },
    {
      name: 'Bruce Wayne',
      age: 35,
      gender: 'Male',
      id: 5,
    },
    {
      name: 'Clark Kent',
      age: 30,
      gender: 'Male',
      id: 6,
    },
    {
      name: 'Diana Prince',
      age: 28,
      gender: 'Female',
      id: 7,
    },
    {
      name: 'Barry Allen',
      age: 25,
      gender: 'Male',
      id: 8,
    },
    {
      name: 'Kara Zor-El',
      age: 23,
      gender: 'Female',
      id: 9,
    },
    {
      name: 'Hal Jordan',
      age: 32,
      gender: 'Male',
      id: 10,
    },
    {
      name: 'Tony Stark',
      age: 40,
      gender: 'Male',
      id: 11,
    },
    {
      name: 'Steve Rogers',
      age: 35,
      gender: 'Male',
      id: 12,
    },
    {
      name: 'Natasha Romanoff',
      age: 30,
      gender: 'Female',
      id: 13,
    },
    {
      name: 'Bruce Banner',
      age: 35,
      gender: 'Male',
      id: 14,
    },
    {
      name: 'Thor Odinson',
      age: 1000,
      gender: 'Male',
      id: 15,
    },
    {
      name: 'Loki Laufeyson',
      age: 1000,
      gender: 'Male',
      id: 16,
    },
    {
      name: 'Heimdall',
      age: 500,
      gender: 'Male',
      id: 17,
    },
    {
      name: 'Sif',
      age: 500,
      gender: 'Female',
      id: 18,
    },
    {
      name: 'Volstagg',
      age: 500,
      gender: 'Male',
      id: 19,
    },
    {
      name: 'Fandral',
      age: 500,
      gender: 'Male',
      id: 20,
    },
    {
      name: 'Hogun',
      age: 500,
      gender: 'Male',
      id: 21,
    },
  ]

  peopleList = signal(this.people)

  tableHeaders = signal<TableHeader[]>([
    {
      renderer: this.checkboxRenderer(),
      payload: 'header',
    },
    {
      text: 'Name',
      sort: {
        key: 'name',
        sort: SortTable.DEFAULT,
      },
    },
    {
      text: 'Name2',
      sort: {
        key: 'name2',
        sort: SortTable.DEFAULT,
      },
    },
    {
      text: 'Name3',
      css: ['justify-content-end'],
      sort: {
        key: 'name3',
        sort: SortTable.DEFAULT,
      },
    },
    {
      text: 'Age',
      sort: {
        key: 'age',
        sort: SortTable.DESC,
      },
    },
    {
      text: 'Gender',
      sort: {
        key: 'gender',
        sort: SortTable.DEFAULT,
      },
    },
    {
      text: '',
    },
  ])

  tableRows = signal(
    this.peopleList()?.map<TableRow<People>>((person) => ({
      css: undefined,
      rowId: `person-${person.id}`,
      payload: person,
      cellData: [
        {
          renderer: this.checkboxRenderer(),
          payload: person.id,
        },
        {
          text: person.name,
        },
        {
          text: person.name,
        },
        {
          renderer: this.name3(),
          payload: person.name,
        },
        {
          text: person.age.toString(),
        },
        {
          text: person.gender,
          css: ['bg-light'],
        },
        {
          renderer: this.actions(),
          payload: person,
        },
      ],
    })) ?? []
  )

  tableConfig = computed<TableConfiguration<People>>(() => ({
    headers: this.tableHeaders(),
    rows: this.tableRows(),
  }))

  selectedRows: string[] = []

  destroyRef = inject(DestroyRef)

  selectFormMap = signal<Map<string, FormControl<boolean>> | undefined>(undefined)

  private readonly formBuilder = inject(NonNullableFormBuilder)

  checkboxForm = this.formBuilder.control(false)

  peopleList$ = toObservable(this.peopleList)
    .pipe(takeUntilDestroyed())
    .subscribe((data) => {
      const targetMap = new Map<string, FormControl<boolean>>()
      const headerForm = this.formBuilder.control(false)
      headerForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((x) => {
        console.log('header', x)
        // loop in the selectFormMap and set everything to the same value as x
        for (const [key, value] of targetMap) {
          if (key !== 'header') value.setValue(x)
        }
      })
      targetMap.set('header', headerForm)
      if (data) {
        for (const datum of data) {
          targetMap.set(datum.id.toString(), this.formBuilder.control(false))
        }
      }
      this.selectFormMap.set(targetMap)
    })

  onEditPerson(id: number): void {
    const person = this.tableConfig().rows.find((x) => x.payload?.id === id)
    if (person) {
      person.css = person?.css?.length ? undefined : ['hover-table']
    }
  }

  addPerson() {
    this.peopleList.set([...this.peopleList(), { name: 'New Person', age: 0, gender: 'Male', id: 1000 }])
  }

  onDeletePerson(id: number): void {
    this.tableConfig().rows = this.tableConfig().rows.filter((x) => x.payload?.id !== id)
  }

  onClickRow(e: TableRow<People>): void {
    if (e?.rowId) {
      if (this.selectedRows.some((x) => x === e.rowId)) {
        this.selectedRows = this.selectedRows.filter((x) => x !== e.rowId)
      } else {
        this.selectedRows.push(e.rowId.toString())
      }
      this.selectedRows = [...this.selectedRows]
    }
  }

  onChangeSort(sortCols: SortCol[]): void {
    this.tableHeaders.update((headers) =>
      headers.map((h) => ({
        ...h,
        sort: h.sort
          ? { ...h.sort, sort: sortCols[0].key === h.sort.key ? sortCols[0].sort : SortTable.DEFAULT }
          : undefined,
      }))
    )
  }
}
