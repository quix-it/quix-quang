import { TestBed } from '@angular/core/testing'

import { QuangNotificationService } from './notification.service'

describe('NotificationService', () => {
  let service: QuangNotificationService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuangNotificationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
