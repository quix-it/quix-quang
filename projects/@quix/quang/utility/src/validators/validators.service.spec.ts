import { TestBed } from '@angular/core/testing'

import { QuangValidatorsService } from './validators.service'

describe('QuangValidatorsService', () => {
  let service: QuangValidatorsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangValidatorsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
