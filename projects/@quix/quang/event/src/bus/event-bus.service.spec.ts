import { TestBed } from '@angular/core/testing'

import { QuangEventBusService } from './event-bus.service'

describe('QuangEventBusService', () => {
  let service: QuangEventBusService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangEventBusService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
