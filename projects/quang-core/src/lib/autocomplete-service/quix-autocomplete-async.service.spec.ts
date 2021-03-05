import { TestBed } from '@angular/core/testing';

import { QuixAutocompleteAsyncService } from './quix-autocomplete-async.service';

describe('QuixAutocompleteAsyncService', () => {
  let service: QuixAutocompleteAsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuixAutocompleteAsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
