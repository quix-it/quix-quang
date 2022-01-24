import { TestBed } from '@angular/core/testing'
import { QuangToastService } from './toast.service'

describe('ToastService', () => {
  let service: QuangToastService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangToastService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
