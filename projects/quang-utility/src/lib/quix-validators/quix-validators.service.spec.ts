import { TestBed } from '@angular/core/testing';

import { QuixValidatorsService } from './quix-validators.service';

describe('QuixValidatorsService', () => {
  let service: QuixValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
