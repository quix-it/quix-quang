import { TestBed } from '@angular/core/testing'

import { QuixModalService } from './quix-modal.service'

describe('QuixModalService', () => {
  let service: QuixModalService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuixModalService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
