import { TestBed } from '@angular/core/testing';

import { QuixWindowServiceService } from './quix-window-service.service';

describe('QuixWindowServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuixWindowServiceService = TestBed.get(QuixWindowServiceService);
    expect(service).toBeTruthy();
  });
});
