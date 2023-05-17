import { TestBed } from '@angular/core/testing'

import { DeviceMotionService } from './device-motion.service'

describe('DeviceMotionService', () => {
  let service: DeviceMotionService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DeviceMotionService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
