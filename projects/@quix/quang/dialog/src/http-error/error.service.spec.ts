import { TestBed } from '@angular/core/testing'

import { QuangHttpErrorService } from './error.service'

describe('QuangHttpErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: QuangHttpErrorService = TestBed.get(QuangHttpErrorService)
    expect(service).toBeTruthy()
  })
})
