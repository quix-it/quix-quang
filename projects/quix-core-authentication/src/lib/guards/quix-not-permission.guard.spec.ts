import { TestBed } from '@angular/core/testing';

import { QuixNotPermissionGuard } from './quix-not-permission.guard';

describe('QuixNotPermissionGuard', () => {
  let guard: QuixNotPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuixNotPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
