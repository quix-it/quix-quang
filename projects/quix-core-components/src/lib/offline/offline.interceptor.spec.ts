import { TestBed } from '@angular/core/testing';

import { QuixOfflineInterceptor } from './offline.interceptor';

describe('OfflineInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      QuixOfflineInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: QuixOfflineInterceptor = TestBed.inject(QuixOfflineInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
