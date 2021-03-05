import { TestBed } from '@angular/core/testing';

import { QuixLayoutService } from './quix-layout.service';

describe('QuixLayoutService', () => {
  let service: QuixLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
