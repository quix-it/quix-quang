import { TestBed } from '@angular/core/testing';

import { QuixAuthService } from './quix-auth.service';

describe('QuixAuthService', () => {
  let service: QuixAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
