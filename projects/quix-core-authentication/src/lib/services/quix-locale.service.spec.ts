import { TestBed } from '@angular/core/testing';

import { QuixLocaleService } from './quix-locale.service';

describe('QuixLocaleService', () => {
  let service: QuixLocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixLocaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
