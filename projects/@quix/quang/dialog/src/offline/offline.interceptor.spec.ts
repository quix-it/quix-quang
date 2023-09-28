import { TestBed } from '@angular/core/testing'

import { QuangOfflineInterceptor } from './offline.interceptor'

describe('OfflineInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      QuangOfflineInterceptor
    ]
  }))

  it('should be created', () => {
    const interceptor: QuangOfflineInterceptor = TestBed.inject(QuangOfflineInterceptor)
    expect(interceptor).toBeTruthy()
  })
})
