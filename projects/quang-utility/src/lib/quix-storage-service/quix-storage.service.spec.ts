import { TestBed } from '@angular/core/testing';

import { QuixStorageService } from './quix-storage.service';

describe('QuixStorageService', () => {
  let service: QuixStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
