import { TestBed } from '@angular/core/testing'

import { QuixSnackbarService } from './quix-snackbar.service'

describe('QuixSnackbarService', () => {
  let service: QuixSnackbarService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuixSnackbarService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
