import { TestBed } from '@angular/core/testing'

import { QuixNotificationService } from './notification.service'

describe('NotificationService', () => {
  let service: QuixNotificationService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QuixNotificationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
