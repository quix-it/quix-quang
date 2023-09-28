import { TestBed } from '@angular/core/testing'

import { QuangLayoutService } from './layout.service'

describe('QuangLayoutService', () => {
  let service: QuangLayoutService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangLayoutService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
