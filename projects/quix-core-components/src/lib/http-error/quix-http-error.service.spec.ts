import { TestBed } from '@angular/core/testing';

import { QuixHttpErrorService } from './quix-http-error.service';

describe('QuixHttpErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuixHttpErrorService = TestBed.get(QuixHttpErrorService);
    expect(service).toBeTruthy();
  });
});
