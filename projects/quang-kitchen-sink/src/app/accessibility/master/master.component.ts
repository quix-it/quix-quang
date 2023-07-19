import { Component, OnInit } from '@angular/core'
import { MasterService } from './master.service'
import { PersonResponse } from './person-response.model'
import { Person } from './person.model'

@Component({
  selector: 'ks-master',
  templateUrl: './master.component.html',
  styles: []
})
export class MasterComponent implements OnInit {
  people: Person[] = []
  size = 10
  page = 1
  sizeList = [10, 15, 25, 50]
  totalItems: number = 0

  constructor (private readonly masterService: MasterService) {}

  ngOnInit (): void {
    this.getPeople()
  }

  getPeople (): void {
    this.masterService
      .getPeople(this.page)
      .subscribe((resp: PersonResponse) => {
        this.people = resp.people
        this.totalItems = resp.count
      })
  }

  pageChange (p: number): void {
    this.page = p + 1
    this.getPeople()
  }

  sizeChange (s: number): void {
    this.size = s
    this.getPeople()
  }
}
