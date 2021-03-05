import { TestBed } from '@angular/core/testing';

import { OfflineInterceptor } from './offline.interceptor';

describe('OfflineInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OfflineInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OfflineInterceptor = TestBed.inject(OfflineInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
