import { TestBed } from '@angular/core/testing'

import { QuangModalService } from './modal.service'

describe('QuangModalService', () => {
  let service: QuangModalService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangModalService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
