import { TestBed } from '@angular/core/testing';

import { SentryDialogService } from './sentry-dialog.service';

describe('SentryDialogService', () => {
  let service: SentryDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentryDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
