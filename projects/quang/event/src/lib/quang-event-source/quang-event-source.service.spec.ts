import { TestBed } from '@angular/core/testing'
import { QuangEventSourceService } from './quang-event-source.service'

describe('QuangEventSourceService', () => {
  let service: QuangEventSourceService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangEventSourceService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
