import { TestBed } from '@angular/core/testing'

import { QuixPaginatorService } from './paginator.service'

describe('PaginatorService', () => {
  let service: QuixPaginatorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuixPaginatorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
