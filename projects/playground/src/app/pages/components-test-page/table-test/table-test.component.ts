import { JsonPipe } from '@angular/common'
import { AfterViewInit, Component, TemplateRef, ViewChild, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { of } from 'rxjs'

import {
  QuangTableComponent,
  SortCol,
  SortTable,
  TableConfiguration,
  TableRow
} from '@quix/quang/components/table/table.component'

interface People {
  name: string
  age: number
  gender: string
  id: number
}

@Component({
  selector: 'playground-table-test',
  standalone: true,
  imports: [QuangTableComponent, JsonPipe],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.scss'
})
export class TableTestComponent implements AfterViewInit {
  @ViewChild('actions') actions?: TemplateRef<any>
  tableConfig: TableConfiguration<People> = {
    headers: [
      {
        text: 'Name',
        sort: {
          key: 'name',
          sort: SortTable.DEFAULT
        }
      },
      {
        text: 'Name2',
        sort: {
          key: 'name2',
          sort: SortTable.DEFAULT
        }
      },
      {
        text: 'Name3',
        sort: {
          key: 'name3',
          sort: SortTable.DEFAULT
        }
      },
      {
        text: 'Age',
        sort: {
          key: 'age',
          sort: SortTable.DESC
        }
      },
      {
        text: 'Gender',
        sort: {
          key: 'gender',
          sort: SortTable.DEFAULT
        }
      },
      {
        text: ''
      }
    ],
    rows: []
  }

  readonly people: People[] = [
    {
      name: 'John Doewegeqwg ewgwgewgeqwgiojeqwiogjewgewiogjiogjew',
      age: 30,
      gender: 'Male',
      id: 1
    },
    {
      name: 'Jane Doe',
      age: 25,
      gender: 'Female',
      id: 2
    },
    {
      name: 'Peter Parker',
      age: 20,
      gender: 'Male',
      id: 3
    },
    {
      name: 'Mary Jane',
      age: 22,
      gender: 'Female',
      id: 4
    },
    {
      name: 'Bruce Wayne',
      age: 35,
      gender: 'Male',
      id: 5
    },
    {
      name: 'Clark Kent',
      age: 30,
      gender: 'Male',
      id: 6
    },
    {
      name: 'Diana Prince',
      age: 28,
      gender: 'Female',
      id: 7
    },
    {
      name: 'Barry Allen',
      age: 25,
      gender: 'Male',
      id: 8
    },
    {
      name: 'Kara Zor-El',
      age: 23,
      gender: 'Female',
      id: 9
    },
    {
      name: 'Hal Jordan',
      age: 32,
      gender: 'Male',
      id: 10
    },
    {
      name: 'Tony Stark',
      age: 40,
      gender: 'Male',
      id: 11
    },
    {
      name: 'Steve Rogers',
      age: 35,
      gender: 'Male',
      id: 12
    },
    {
      name: 'Natasha Romanoff',
      age: 30,
      gender: 'Female',
      id: 13
    },
    {
      name: 'Bruce Banner',
      age: 35,
      gender: 'Male',
      id: 14
    },
    {
      name: 'Thor Odinson',
      age: 1000,
      gender: 'Male',
      id: 15
    },
    {
      name: 'Loki Laufeyson',
      age: 1000,
      gender: 'Male',
      id: 16
    },
    {
      name: 'Heimdall',
      age: 500,
      gender: 'Male',
      id: 17
    },
    {
      name: 'Sif',
      age: 500,
      gender: 'Female',
      id: 18
    },
    {
      name: 'Volstagg',
      age: 500,
      gender: 'Male',
      id: 19
    },
    {
      name: 'Fandral',
      age: 500,
      gender: 'Male',
      id: 20
    },
    {
      name: 'Hogun',
      age: 500,
      gender: 'Male',
      id: 21
    }
  ]

  selectedRows: string[] = []

  _takeUntilDestroyed = signal(takeUntilDestroyed())

  ngAfterViewInit(): void {
    this.generateTable()
  }

  generateTable(): void {
    of(this.people)
      .pipe(this._takeUntilDestroyed())
      .subscribe((people) => {
        if (Array.isArray(people) && people?.length) {
          this.tableConfig.rows = people.map((person): TableRow<People> => {
            return {
              css: undefined,
              rowId: `person-${person.id}`,
              payload: person,
              cellData: [
                {
                  text: person.name
                },
                {
                  text: person.name
                },
                {
                  text: person.name
                },
                {
                  text: person.age
                },
                {
                  text: person.gender,
                  css: ['bg-info']
                },
                {
                  renderer: this.actions,
                  payload: person
                }
              ]
            }
          })
          this.tableConfig.rows.unshift({
            cellData: [
              {
                fullWidth: true,
                css: ['bg-info'],
                text: 'gagagaggagagagagaga'
              }
            ]
          })
        } else {
          this.tableConfig.rows = []
        }
        this.tableConfig = {
          ...this.tableConfig
        }
      })
  }

  onEditPerson(id: number): void {
    const person = this.tableConfig.rows.find((x) => x.payload?.id === id)
    if (person) {
      person.css = person?.css?.length ? undefined : ['hover-table']
    }
  }

  onDeletePerson(id: number): void {
    this.tableConfig.rows = this.tableConfig.rows.filter((x) => x.payload?.id !== id)
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
    console.log(sortCols)
  }
}
