import { TestBed } from '@angular/core/testing'

import { QuangStorageService } from './quang-storage.service'

describe('QuangStorageService', () => {
  let service: QuangStorageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangStorageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
