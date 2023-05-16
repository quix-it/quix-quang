import { TestBed } from '@angular/core/testing'

import { QuangAutocompleteAsyncService } from './quang-autocomplete-async.service'

describe('QuangAutocompleteAsyncService', () => {
  let service: QuangAutocompleteAsyncService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangAutocompleteAsyncService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
