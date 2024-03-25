import { TestBed } from '@angular/core/testing'

import { StarshipsService } from './starships.service'

describe('StarshipsService', () => {
  let service: StarshipsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(StarshipsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
