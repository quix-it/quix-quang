import { TestBed } from '@angular/core/testing'

import { QuangPaginatorService } from './paginator.service'

describe('PaginatorService', () => {
  let service: QuangPaginatorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangPaginatorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
