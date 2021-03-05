import { TestBed } from '@angular/core/testing';

import { QuangAuthService } from './quang-auth.service';

describe('QuangAuthService', () => {
  let service: QuangAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuangAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
