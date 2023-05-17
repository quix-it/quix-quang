import { TestBed } from '@angular/core/testing'

import { QuangSnackbarService } from './quang-snackbar.service'

describe('QuangSnackbarService', () => {
  let service: QuangSnackbarService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangSnackbarService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
