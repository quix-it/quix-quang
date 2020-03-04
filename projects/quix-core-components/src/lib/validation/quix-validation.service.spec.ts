import { TestBed } from '@angular/core/testing';

import {QuixValidationService} from './quix-validation.service';

describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuixValidationService = TestBed.get(QuixValidationService);
    expect(service).toBeTruthy();
  });
});
